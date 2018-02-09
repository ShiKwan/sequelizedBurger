$(function () {
  $(".alert").hide();
  $('#btnCreate').on('click', function (event) {
    event.preventDefault()
    var successBool = false;
    var newBurger = {
      name: $('#bn').val().trim(),
      devoured: false
    }

    $.ajax('/api/burgers', {
      type: 'POST',
      data: newBurger,
      success : function(data, status, xhr){
        successBool = true;
        $(".alert").empty();
        $(".alert").removeClass("alert-danger");
        $(".alert").hide();
      },
      error : function(xhr, status, error){
        $(".control-label").addClass("required")
        console.log("xhr", xhr.responseJSON.message);
        var errorMsg = xhr.responseJSON.message.split(":");
        $(".alert").addClass("alert-danger");
        $(".alert").html(errorMsg[1]);
        $(".alert").show();
      },
      complete : function(){
        if(successBool){
          console.log("created new burger");
          location.reload();
        }
      }
    })
  });

  $('.change-devour').on('click', function(event){
      var id = $(this).data("id");
      
      var newDevour = $(this).data("devoured")
      var newDevourState = {
          devoured : true,
          customerName : $('.textbox[data-id=' + id + ' ]').val()
      }
      
      console.log("new devour state --: ");
      console.log(newDevourState);
      var successBool = false;
      $.ajax("/api/burgers/" +id, {
          type : "PUT",
          data : newDevourState,
          success : function(data, status, xhr){
          successBool = true;
          $(".alert").empty();
          $(".alert").hide();
          $(".alert").removeClass("alert-danger");
          },
          error : function(xhr, status, error){
            console.log("xhr", xhr);
            $(".txt-eaten").addClass("required");
            var errorMsg = xhr.responseJSON.message.split(":");
            $(".alert").addClass("alert-danger");
            $(".alert").html(errorMsg[1]);
            $(".alert").show();
          },
          complete : function(){
            if(successBool){
              console.log("customer ate da burger");
              location.reload();
            }
          }
      })
  })
})
