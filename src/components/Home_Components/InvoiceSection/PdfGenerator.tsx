import DownloadPreview from "../DownloadSection/DownloadPreview";
import React from "react";

const PdfGenerator = React.forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref}>
    <DownloadPreview />
  </div>
));
export default PdfGenerator;
