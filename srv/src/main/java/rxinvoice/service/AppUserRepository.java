package rxinvoice.service;

import org.bson.types.ObjectId;
import restx.admin.AdminModule;
import restx.factory.Component;
import restx.jongo.JongoCollection;
import restx.jongo.JongoUserRepository;
import restx.security.CredentialsStrategy;
import rxinvoice.domain.User;

import javax.inject.Named;
import java.util.Arrays;

import static rxinvoice.AppModule.Roles.ADMIN;

/**
 */
@Component
public class AppUserRepository extends JongoUserRepository<User> {
    public static final User defaultAdminUser = new User()
            .setKey(new ObjectId().toString())
            .setName("admin")
            .setRoles(Arrays.asList(ADMIN, AdminModule.RESTX_ADMIN_ROLE));

    public static final RefUserByKeyStrategy<User> USER_REF_STRATEGY = new RefUserByKeyStrategy<User>() {
        @Override
        protected String getId(User user) {
            return user.getKey();
        }
    };

    public AppUserRepository(@Named("users") JongoCollection users,
                             @Named("userCredentials") JongoCollection userCredentials,
                             CredentialsStrategy credentialsStrategy) {
        super(
                users, userCredentials,
                USER_REF_STRATEGY, credentialsStrategy,
                User.class, defaultAdminUser
        );
    }
}
