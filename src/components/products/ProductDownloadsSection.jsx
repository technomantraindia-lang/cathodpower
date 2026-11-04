import "./ProductDownloadsSection.css";

export default function ProductDownloadsSection({ product }) {
  const downloads = product.downloads || [];

  return (
    <section className="downloadsSection">
      <div className="downloadsContainer">
        <div className="downloadsHeader">
          <h2>Data Download</h2>
        </div>

        <div className="downloadsTabs">
          <button className="downloadsTab active">Datasheet</button>
        </div>

        <div className="downloadsTable">
          <div className="downloadsHead">
            <span>File name</span>
            <span>Language</span>
            <span>Format</span>
            <span>Size</span>
            <span>Last updated</span>
            <span>Download</span>
          </div>

          {downloads.map((file, index) => (
            <div key={index} className="downloadsRow">
              <span>{file.name}</span>
              <span>{file.language}</span>
              <span>{file.format}</span>
              <span>{file.size}</span>
              <span>{file.updated}</span>

              <span>
                <a
                  href={file.url}
                  download={file.downloadName || `${file.name}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="downloadBtn"
                  title={`Download ${file.name}`}
                  aria-label={`Download ${file.name}`}
                >
                  ↓
                </a>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
