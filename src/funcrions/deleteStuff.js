import axios from "axios";
import swal from "sweetalert";

export const deleteFunction = (title, name, url, fun) => {
    swal({
      title: title,
      text: `Are you sure to delete ${name}?`,
      icon: "warning",
      buttons: {
        cancel : 'No',
        confirm : {text:'Yes',className:'sweet-warning'},
    }

    }).then((response) => {
      if (response) {
        axios.delete(url).then(()=> {
          swal({text: `You have successfully deleted ${name}`,
          icon:"success", timer: "2000"})
          fun()
        }).catch((err) => {
          swal({text: err.response.data.message,
      icon:"error", timer: "2000"})
        })
        
      }
    })
  }