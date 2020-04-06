package rxinvoice;

import com.google.common.base.Charsets;
import com.google.common.base.Optional;
import com.google.common.base.Predicates;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import org.jongo.Mapper;
import org.jongo.marshall.jackson.JacksonMapper;
import restx.config.ConfigLoader;
import restx.config.ConfigSupplier;
import restx.factory.Module;
import restx.factory.Provides;
import restx.i18n.SupportedLocale;
import restx.jackson.BsonJodaTimeModule;
import restx.jackson.Views;
import restx.jongo.JongoCollection;
import restx.mongo.MongoModule;
import restx.security.*;
import rxinvoice.domain.User;
import rxinvoice.service.AppUserRepository;

import javax.inject.Named;
import java.util.Locale;
import java.util.regex.Pattern;

@Module
public class AppModule {
    public static User currentUser() {
        return (User) RestxSession.current().getPrincipal().get();
    }

    public static final class Roles {
        // we don't use an enum here because roles in @RolesAllowed have to be constant strings
        public static final String ADMIN = "admin";
        public static final String SELLER = "seller";
        public static final String BUYER = "buyer";
        public static final String CORS = "cors";
    }

    @Provides
    public SignatureKey signatureKey() {
         return new SignatureKey(
                 "rxinvoice -6496014073139514714 rxinvoice 2beab8fc-4422-46fc-8b80-4453071c3ff9"
                         .getBytes(Charsets.UTF_8));
    }

    @Provides @Named(MongoModule.MONGO_DB_NAME)
    public String dbName() {
        return "rxinvoice";
    }

    @Provides @Named("restx.app.package")
    public String appPackage() {
        return "rxinvoice";
    }

    @Provides @Named("FR")
    public SupportedLocale french() {
        return new SupportedLocale(Locale.FRENCH);
    }

    @Provides
    public CredentialsStrategy credentialsStrategy() {
        return new BCryptCredentialsStrategy();
    }

    @Provides
    public BasicPrincipalAuthenticator basicPrincipalAuthenticator(
            final AppUserRepository userRepository, SecuritySettings securitySettings,
            final CredentialsStrategy credentialsStrategy, @Named("users") final JongoCollection users) {
        return new BasicPrincipalAuthenticator() {
            @Override
            public Optional<? extends RestxPrincipal> findByName(String name) {
                User user = users.get().findOne("{ $or: [{name: #}, {email: #}] }", name, name).as(User.class);
                if (user == null) {
                    return Optional.absent();
                }
                return Optional.of(user);
            }

            @Override
            public Optional<? extends RestxPrincipal> authenticate(
                    String name, String passwordHash, ImmutableMap<String, ?> principalData) {
                Optional<? extends RestxPrincipal> user = findByName(name);
                if (user.isPresent()) {
                    Optional<String> credential = userRepository.findCredentialByUserName(user.get().getName());
                    if (credential.isPresent() && credentialsStrategy.checkCredentials(name, passwordHash, credential.get())) {
                        return user;
                    }
                }

                return Optional.absent();
            }
        };
    }

    @Provides
    public ConfigSupplier appConfigSupplier(ConfigLoader configLoader) {
        return configLoader.fromResource("settings/settings");
    }

    @Provides
    public CORSAuthorizer getApiDocsAuthorizer() {
        return StdCORSAuthorizer.builder()
                .setOriginMatcher(Predicates.<CharSequence>alwaysTrue())
                .setPathMatcher(Predicates.contains(Pattern.compile("^/cors")))
                .setAllowedMethods(ImmutableList.of("OPTIONS", "GET", "POST"))
                .setAllowedHeaders(ImmutableList.of("accept", "authorization", "content-type"))
                .build();
    }

    @Provides
    @Named("Mapper")
    public Mapper mapper() {
        return new JacksonMapper.Builder()
                .registerModule(new BsonJodaTimeModule())
                .registerModule(new BsonJodaTimeMoreModule())
                .withView(Views.Private.class)
                .build();
    }
}
