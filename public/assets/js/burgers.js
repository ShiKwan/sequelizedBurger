$(function () {
  $('.create-form').on('submit', function (event) {
    event.preventDefault()

    var newBurger = {
      name: $('#bn').val().trim(),
      devoured: false
    }

    $.ajax('/api/burgers', {
      type: 'POST',
      data: newBurger
    }).then(
      function () {
        console.log('created new burger')
        location.reload()
      }
    )
  })

  $('.change-devour').on('click', function(event){
      var id = $(this).data("id");
      var newDevour = $(this).data("devoured")

      var newDevourState = {
          devoured : newDevour
      }

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
