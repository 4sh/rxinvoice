package rxinvoice.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.collect.ImmutableSet;
import org.jongo.marshall.jackson.oid.Id;
import org.jongo.marshall.jackson.oid.ObjectId;
import restx.exceptions.ErrorCode;
import restx.exceptions.ErrorField;
import restx.security.RestxPrincipal;
import rxinvoice.AppModule;

import java.util.ArrayList;
import java.util.Collection;

/**
 */
public class User implements RestxPrincipal {
    @Id @ObjectId
    private String key;

    private String name;
    private String email;
    private Collection<String> roles;
    private CompanyRole companyRole;

    private String companyRef;

    public String getKey() {
        return key;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public Collection<String> getRoles() {
        return roles;
    }

    public String getCompanyRef() {
        return companyRef;
    }

    @Override @JsonIgnore
    public ImmutableSet<String> getPrincipalRoles() {
        return ImmutableSet.copyOf(roles);
    }

    public User setKey(final String key) {
        this.key = key;
        return this;
    }

    public User setName(final String name) {
        this.name = name;
        return this;
    }

    public User setEmail(final String email) {
        this.email = email;
        return this;
    }

    public User setRoles(final Collection<String> roles) {
        this.roles = roles;
        return this;
    }

    public User setCompanyRef(final String companyRef) {
        this.companyRef = companyRef;
        return this;
    }

    public CompanyRole getCompanyRole() {
        return companyRole;
    }

    public User setCompanyRole(CompanyRole companyRole) {
        this.companyRole = companyRole;
        return this;
    }

    @Override
    public String toString() {
        return "User{" +
                "key='" + key + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", roles=" + roles +
                ", companyRef='" + companyRef + '\'' +
                '}';
    }

    public static class Rules {
        @ErrorCode(code = "USER-001", description = "must have a company")
        public static enum CompanyRef {
            @ErrorField("user key") KEY
        }
        @ErrorCode(code = "USER-002", description = "must have valid company - provided company key not found")
        public static enum ValidCompanyRef {
            @ErrorField("user key") KEY,
            @ErrorField("company ref") COMPANY_REF
        }
    }
}
