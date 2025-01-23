exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.ventasBoard = (req, res) => {
    res.status(200).send("Ventas Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.SuperAdminBoard = (req, res) => {
    res.status(200).send("SuperAdmin Content.");
  };