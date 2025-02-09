import React from "react";
import { useHistory } from "react-router";
import { unassignTable } from "../../utils/api";

export default function FinishButton({ status, table, loadDashboard }) {
  const history = useHistory();

  async function handleClick() {
    return window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    )
      ? await handleFinish(table.table_id, table.reservation_id)
      : null;
  }
//Our finish handler this calls recursively functions after certain conditions are met to re-load the page at the Dashboard's URL.
  async function handleFinish(table_id, reservation_id) {
    await unassignTable(table_id, reservation_id);
    await loadDashboard();
    history.push("/dashboard");
  }
//HTML5
  return (
    status === "Occupied" && (
      <td>
        <button
          data-table-id-finish={table.table_id}
          type="button"
          onClick={handleClick}
          className="btn btn-sm btn-primary"
        >
          Finish
        </button>
      </td>
    )
  );
}