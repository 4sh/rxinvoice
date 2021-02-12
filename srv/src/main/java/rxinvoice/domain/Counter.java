package rxinvoice.domain;

public class Counter {

    private String name;
    private Long sequenceValue;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getSequenceValue() {
        return sequenceValue;
    }

    public void setSequenceValue(Long sequenceValue) {
        this.sequenceValue = sequenceValue;
    }

    @Override
    public String toString() {
        return "Counter{" +
                "name='" + name + '\'' +
                ", sequenceValue='" + sequenceValue + '\'' +
                '}';
    }
}
