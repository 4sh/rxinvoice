package rxinvoice.domain.company;

import rxinvoice.domain.Metrics;

public class CompanyMetrics {

    private Metrics global;
    private Metrics previousYear;
    private Metrics currentYear;
    private Metrics nextYear;

    @Override
    public String toString() {
        return "CompanyMetrics{" +
                "global=" + global +
                ", previousYear=" + previousYear +
                ", currentYear=" + currentYear +
                ", nextYear=" + nextYear +
                '}';
    }

    public Metrics getPreviousYear() {
        return previousYear;
    }

    public CompanyMetrics setPreviousYear(Metrics previousYear) {
        this.previousYear = previousYear;
        return this;
    }

    public Metrics getCurrentYear() {
        return currentYear;
    }

    public CompanyMetrics setCurrentYear(Metrics currentYear) {
        this.currentYear = currentYear;
        return this;
    }

    public Metrics getNextYear() {
        return nextYear;
    }

    public CompanyMetrics setNextYear(Metrics nextYear) {
        this.nextYear = nextYear;
        return this;
    }

    public Metrics getGlobal() {
        return global;
    }

    public CompanyMetrics setGlobal(Metrics global) {
        this.global = global;
        return this;
    }
}
