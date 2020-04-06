package rxinvoice.web;

import com.google.common.base.Optional;
import restx.exceptions.RestxErrors;
import restx.http.HttpStatus;
import restx.Status;
import restx.WebException;
import restx.annotations.*;
import restx.factory.Component;
import restx.security.RolesAllowed;
import rxinvoice.AppModule;
import rxinvoice.domain.User;

import java.util.Map;

import static com.google.common.base.Preconditions.checkNotNull;
import static restx.common.MorePreconditions.checkEquals;
import static rxinvoice.AppModule.Roles.*;

/**
 */
@Component @RestxResource
public class UserResource {
    private final AppUserRepository appUserRepository;
    private final RestxErrors errors;
    private final CompanyResource companyResource;

    public UserResource(AppUserRepository appUserRepository, RestxErrors errors,
                        CompanyResource companyResource) {
        this.appUserRepository = appUserRepository;
        this.errors = errors;
        this.companyResource = companyResource;
    }

    @RolesAllowed(ADMIN)
    @POST("/users")
    public User createUser(User user) {
        checkUserRules(user);
        return appUserRepository.createUser(user);
    }

    @PUT("/users/{key}")
    public User updateUser(String key, User user) {
        checkEquals("key", key, "user.key", user.getKey());
        checkSelfOrAdmin(key);
        checkUserRules(user);
        return appUserRepository.updateUser(user);
    }

    @RolesAllowed(ADMIN)
    @GET("/users")
    public Iterable<User> findUsers() {
        return appUserRepository.findAllUsers();
    }

    @GET("/users/{key}")
    public Optional<User> findUserByKey(String key) {
        checkSelfOrAdmin(key);
        return appUserRepository.findUserByKey(key);
    }

    @RolesAllowed(ADMIN)
    @DELETE("/users/{key}")
    public void deleteUser(String key) {
        appUserRepository.deleteUser(key);
    }

    @PUT("/users/{userKey}/credentials")
    public Status setCredentials(String userKey, Map newCredentials) {
        checkSelfOrAdmin(userKey);

        String passwordHash = (String) newCredentials.get("passwordHash");
        checkNotNull(passwordHash, "new credentials must have a passwordHash property");
        appUserRepository.setCredentials(userKey, passwordHash);

        return Status.of("updated");
    }

    private void checkUserRules(User user) {
        if (user.getPrincipalRoles().contains(SELLER) || user.getPrincipalRoles().contains(BUYER)) {
            if (user.getCompanyRef() == null) {
                throw errors.on(User.Rules.CompanyRef.class)
                        .set(User.Rules.CompanyRef.KEY, user.getKey())
                        .raise();
            }
            if (!companyResource.findCompanyByKey(user.getCompanyRef()).isPresent()) {
                throw errors.on(User.Rules.ValidCompanyRef.class)
                        .set(User.Rules.ValidCompanyRef.KEY, user.getKey())
                        .set(User.Rules.ValidCompanyRef.COMPANY_REF, user.getCompanyRef())
                        .raise();
            }
        }
    }

    public static void checkSelfOrAdmin(String userKey) {
        User user = AppModule.currentUser();
        if (!user.getPrincipalRoles().contains(ADMIN)
                && !user.getKey().equals(userKey)) {
            throw new WebException(HttpStatus.FORBIDDEN);
        }
    }
}
