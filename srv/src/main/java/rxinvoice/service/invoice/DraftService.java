package rxinvoice.service.invoice;

import com.google.common.collect.Lists;
import com.mongodb.QueryBuilder;
import org.bson.types.ObjectId;
import restx.factory.Component;
import rxinvoice.AppModule;
import rxinvoice.dao.InvoiceDao;
import rxinvoice.domain.CompanyRole;
import rxinvoice.domain.User;
import rxinvoice.domain.invoice.Invoice;
import rxinvoice.jongo.MoreJongos;
import rxinvoice.utils.SortCriteriaUtil;
import rxinvoice.utils.SortDirection;
import rxinvoice.utils.SortProperty;

import java.util.Optional;


@Component
public class DraftService {

    private final InvoiceDao invoiceDao;

    public DraftService(InvoiceDao invoiceDao) {
        this.invoiceDao = invoiceDao;
    }

    public Iterable<Invoice> findAll() {
        User user = AppModule.currentUser();
        if (user.getCompanyRoles().isEmpty() || (user.getCompanyRoles().size() == 1 && user.getCompanyRoles().contains(CompanyRole.ADMINISTRATIVE))) {
            throw new UnsupportedOperationException("");
        }

        QueryBuilder builder = QueryBuilder.start();

        builder.and("seller._id").is(new ObjectId(user.getCompanyRef()));
        builder.and("status").is("DRAFT");


        if (!user.getCompanyRoles().contains(CompanyRole.DIRECTOR) && user.getCompanyRoles().contains(CompanyRole.INVOICING)) {
            QueryBuilder.start().or(
                    QueryBuilder.start("business.businessManagerRef").is(MoreJongos.containsIgnoreCase(user.getKey())).get(),
                    QueryBuilder.start("commercialRelation.customerManagerRef").is(MoreJongos.containsIgnoreCase(user.getKey())).get())
                    .get();
        }

        // Handle sort to get list sorted by invoice date DESC.
        SortProperty sortProperty = new SortProperty("invoiceDate", SortDirection.DESC);
        String sortQuery = SortCriteriaUtil.buildMongoSortQuery(Lists.newArrayList(sortProperty));

        return invoiceDao.find(builder.get().toString(), Optional.of(sortQuery));
    }
}
