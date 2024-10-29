const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "TITLE", uid: "TITLE", sortable: true},
    {name: "DESCRIPTION", uid: "DESCRIPTION", sortable: true},
    {name: "PRICE", uid: "PRICE", sortable: true},
    {name: "DATE", uid: "DATE", sortable: true},
    {name: "STATUS", uid: "STATUS", sortable: true},
    {name: "ACTIONS", uid: "ACTIONS"},
  ];
  
  const statusOptions = [
    {name: "Active", uid: "active"},
    {name: "Paused", uid: "paused"},
    
  ];
  
  export {columns, statusOptions};