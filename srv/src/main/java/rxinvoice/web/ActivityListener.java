package rxinvoice.web;

import com.google.common.eventbus.EventBus;
import com.google.common.eventbus.Subscribe;
import restx.annotations.GET;
import restx.annotations.RestxResource;
import restx.common.UUIDGenerator;
import restx.exceptions.ErrorCode;
import restx.exceptions.RestxErrors;
import restx.factory.Component;
import restx.http.HttpStatus;
import restx.jongo.JongoCollection;
import rxinvoice.domain.Activity;

import javax.inject.Named;

@RestxResource
@Component
public class ActivityListener implements AutoCloseable {
    @ErrorCode(code = "SNBC-002", description = "This uri must not be called", status= HttpStatus.FORBIDDEN)
    private enum ShouldNotBeCalled {}

    private final JongoCollection activities;
    private final EventBus eventBus;

    public ActivityListener(@Named("activities") JongoCollection activities, EventBus eventBus) {
        this.activities = activities;
        this.eventBus = eventBus;
        eventBus.register(this);
    }

    @Subscribe
    public void activityPosted(Activity activity) {
        activities.get().save(activity);
    }

    @GET("/activities/mustNotBeCalled")
    public String test() {
        throw new RestxErrors(new UUIDGenerator.DefaultUUIDGenerator()).on(ShouldNotBeCalled.class).raise();
    }

    @Override
    public void close() throws Exception {
        eventBus.unregister(this);
    }
}
