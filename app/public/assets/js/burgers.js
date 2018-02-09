$(function () {
  $('#btnCreate').on('click', function (event) {
    event.preventDefault()

    var newBurger = {
      name: $('#bn').val().trim(),
      devoured: false
    }

    $.ajax('/api/burgers', {
      type: 'POST',
      data: newBurger
    }).then(
      function (err) {
        if(err){
          console.log(err);
        }else{
          console.log('created new burger')
        location.reload();
         }
       
      }
    )
  });

  $('.change-devour').on('click', function(event){
      var id = $(this).data("id");
      var newDevour = $(this).data("devoured")
      console.log("id : " + id);
      console.log(newDevour);
      var newDevourState = {
          devoured : true,
          customerName : $('.textbox[data-id=' + id + ' ]').val()
      }
      console.log("new devour state --: ");
      console.log(newDevourState);
      $.ajax("/api/burgers/" +id, {
          type : "PUT",
          data : newDevourState
      }).then(
          function(){
              console.log("changed devoured to ", newDevour);
              location.reload();
          }
      )
  })
})
