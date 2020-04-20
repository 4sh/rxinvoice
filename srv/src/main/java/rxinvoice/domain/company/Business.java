package rxinvoice.domain.company;

public class Business {

    private String reference;
    private String name;
    private String businessManagerRef;

    @Override
    public String toString() {
        return "Business{" +
                "reference='" + reference + '\'' +
                ", name='" + name + '\'' +
                ", businessManagerRef='" + businessManagerRef + '\'' +
                '}';
    }

    public String getReference() {
        return reference;
    }

    public Business setReference(String reference) {
        this.reference = reference;
        return this;
    }

    public String getName() {
        return name;
    }

    public Business setName(String name) {
        this.name = name;
        return this;
    }

    public String getBusinessManagerRef() {
        return businessManagerRef;
    }

    public Business setBusinessManagerRef(String businessManagerRef) {
        this.businessManagerRef = businessManagerRef;
        return this;
    }
}