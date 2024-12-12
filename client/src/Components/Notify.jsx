import React from "react"
import Swal from "sweetalert2";

export const notify = (Icon, Title, Text) => {// create alert function to easily use within project anyware
    Swal.fire({
       icon: Icon,
       title: Title,
       text: Text,
       timer: 5000,
       showConfirmButton: false
    })
 };