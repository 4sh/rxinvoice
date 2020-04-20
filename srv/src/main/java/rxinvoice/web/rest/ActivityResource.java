package rxinvoice.web.rest;

import com.google.common.base.Optional;
import restx.annotations.GET;
import restx.annotations.RestxResource;
import restx.factory.Component;
import restx.jongo.JongoCollection;
import restx.security.PermitAll;
import rxinvoice.domain.Activity;

import javax.inject.Named;

@RestxResource
@Component
public class ActivityResource {
    private final JongoCollection activites;

    public ActivityResource(@Named("activities") JongoCollection activites) {
        this.activites = activites;
    }

    @GET("/activities/latest")
    @PermitAll
    public Iterable<Activity> findLatestActivities(Optional<String> count, Optional<String> sort) {
        int limit = Integer.valueOf(count.or("20"));
        String sortOrder = sort.or("desc");
        String sortKey = "asc".equalsIgnoreCase(sortOrder) ? "{timestamp: 1}" : "{timestamp: -1}";

        return activites.get().find().limit(limit).sort(sortKey).as(Activity.class);
    }

    @GET("/activities/:kind/:ref")
    @PermitAll
    public Iterable<Activity> findAllActivities(String kind, String ref) {
        return activites.get().find("{objectType: #, objectKey: #}", kind, ref)
                .sort("{timestamp: -1}").as(Activity.class);
    }
}
