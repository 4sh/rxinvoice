package rxinvoice.web.rest;

import com.google.common.base.Optional;
import com.google.common.io.CountingInputStream;
import com.mongodb.BasicDBObject;
import com.mongodb.gridfs.GridFS;
import com.mongodb.gridfs.GridFSDBFile;
import com.mongodb.gridfs.GridFSInputFile;
import org.bson.types.ObjectId;
import org.jongo.Jongo;
import restx.annotations.GET;
import restx.annotations.RestxResource;
import restx.factory.Component;
import rxinvoice.domain.Blob;

import javax.inject.Named;
import java.io.InputStream;

/**
 * Date: 18/6/15
 * Time: 11:54
 */
@Component
@RestxResource
public class BlobService {
    private final GridFS gridFS;
    private final Jongo jongo;

    public BlobService(@Named("Jongo") Jongo jongo) {
        this.jongo = jongo;
        this.gridFS = new GridFS(jongo.getDatabase(), "attachments");
    }

    public Blob create(Blob blob, InputStream content) {
        CountingInputStream counting = new CountingInputStream(content);
        int number = gridFS.getFileList().count() + 1;

        GridFSInputFile gfsFile = gridFS.createFile(counting);
        gfsFile.setFilename(blob.getFileName());
        gfsFile.setContentType(blob.getMimeType());
        gfsFile.setMetaData(new BasicDBObject()
                .append("sizeInBytes", counting.getCount())
                .append("number", number)
        );
        gfsFile.save();

        blob.setId(String.valueOf(gfsFile.getId()));
        blob.setSizeInBytes(counting.getCount());
        blob.setNumber(number);

        return blob;
    }

    public Optional<Blob> find(String id) {
        GridFSDBFile gridFSDBFile = gridFS.findOne(new ObjectId(id));
        if (gridFSDBFile == null) {
            return Optional.absent();
        }

        return Optional.of(gridFSDBFileToBlob(gridFSDBFile));
    }

    public void renameBlob(String id, String name) {
        jongo.getCollection("attachments.files").update(new ObjectId(id)).with("{$set: {filename: #}}", name);
    }

    private Blob gridFSDBFileToBlob(GridFSDBFile gridFSDBFile) {
        Blob blob = new Blob()
                .setId(String.valueOf(gridFSDBFile.getId()))
                .setFileName(gridFSDBFile.getFilename())
                .setMimeType(gridFSDBFile.getContentType())
                .setSizeInBytes((Long) gridFSDBFile.getMetaData().get("sizeInBytes"));

        return blob;
    }

    public InputStream openStream(String id) {
        GridFSDBFile gridFSDBFile = gridFS.findOne(new ObjectId(id));
        if (gridFSDBFile == null) {
            throw new IllegalArgumentException("blob not found: " + id);
        }
        return gridFSDBFile.getInputStream();
    }

    @GET("/blobs/:id")
    public Blob findBlobsById(String id) {
        GridFSDBFile file = gridFS.findOne(new ObjectId(id));

        return gridFSDBFileToBlob(file);
    }

    public void definitiveDelete(String id) {
        gridFS.remove(new ObjectId(id));
    }
}
