import { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { api } from "../../../../shared/clients/APIClient";
import { File, GetFileResponse, ListFileResponse } from "../../typings/file";
import { Spinner } from "../../../../shared/styleguide/Spinner/Spinner";

interface DocumentsTableProps {
  file: File;
}

const DownloadFile = ({ file }: DocumentsTableProps) => {
  const [loading, setLoading] = useState(false);

  const downloadFile = async () => {
    try {
      setLoading(true);
      api
        .get(`/file/${file.id}`, {
          responseType: "blob",
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", file.file_name);
          document.body.appendChild(link);
          link.click();
        });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="p-4 shadow-md bg-gray-50 flex cursor-pointer rounded"
      onClick={loading ? () => {} : downloadFile}
    >
      {loading ? <Spinner /> : <FiDownload />}
    </button>
  );
};

export { DownloadFile };
