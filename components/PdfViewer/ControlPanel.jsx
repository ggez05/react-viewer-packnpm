import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

const ControlPanel = (props) => {
  const { file, pageNumber, numPages, setPageNumber, scale, setScale } = props;

  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;

  const firstPageClass = isFirstPage ? "disabled" : "clickable";
  const lastPageClass = isLastPage ? "disabled" : "clickable";

  const goToFirstPage = () => {
    if (!isFirstPage) setPageNumber(1);
  };
  const goToPreviousPage = () => {
    if (!isFirstPage) setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    if (!isLastPage) setPageNumber(pageNumber + 1);
  };
  const goToLastPage = () => {
    if (!isLastPage) setPageNumber(numPages);
  };

  const onPageChange = (e) => {
    const { value } = e.target;
    setPageNumber(Number(value));
  };

  const isMinZoom = scale < 0.6;
  const isMaxZoom = scale >= 2.0;

  const zoomOutClass = isMinZoom ? "disabled" : "clickable";
  const zoomInClass = isMaxZoom ? "disabled" : "clickable";

  const zoomOut = () => {
    if (!isMinZoom) setScale(scale - 0.1);
  };

  const zoomIn = () => {
    if (!isMaxZoom) setScale(scale + 0.1);
  };

  return (
    <div className="control-panel controlpanel_container">
      <div className="controlpanel_wrap">
        <KeyboardDoubleArrowLeftIcon
          className={`marginleftrightpdf ${firstPageClass}`}
          onClick={goToFirstPage}
        />
        <KeyboardArrowLeftIcon
          className={`marginleftrightpdf ${firstPageClass}`}
          onClick={goToPreviousPage}
        />
        <span className="pageinput_pdfreader">
          Page{" "}
          <input
            name="pageNumber"
            type="number"
            min={1}
            max={numPages || 1}
            className="pageinput_pdfreaderinput"
            value={pageNumber}
            onChange={onPageChange}
          />{" "}
          of {numPages}
        </span>
        <KeyboardArrowRightIcon
          className={`fas fa-forward marginleftrightpdf ${lastPageClass}`}
          onClick={goToNextPage}
        />
        <KeyboardDoubleArrowRightIcon
          className={`fas fa-fast-forward marginleftrightpdf ${lastPageClass}`}
          onClick={goToLastPage}
        />
      </div>
      <div className="pdfzoomcontrolpanel">
        <ZoomOutIcon
          className={`fas fa-search-minus marginleftrightpdf ${zoomOutClass}`}
          onClick={zoomOut}
        />
        <span>{(scale * 100).toFixed()}%</span>
        <ZoomInIcon
          className={`fas fa-search-plus marginleftrightpdf ${zoomInClass}`}
          onClick={zoomIn}
        />
      </div>
    </div>
  );
};

export default ControlPanel;
