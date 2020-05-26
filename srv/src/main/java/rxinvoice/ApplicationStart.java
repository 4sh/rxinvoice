package rxinvoice;

import restx.factory.AutoStartable;
import restx.factory.Component;

@Component
public class ApplicationStart implements AutoStartable {
    private final DatamaintainAutoMigrate datamaintainAutoMigrate;

    public ApplicationStart(DatamaintainAutoMigrate datamaintainAutoMigrate) {
        this.datamaintainAutoMigrate = datamaintainAutoMigrate;
    }

    @Override
    public void start() {
        datamaintainAutoMigrate.start();
    }
}
