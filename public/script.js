$('.btn').click(()=>{

  if( $('#trueUrl').val() !== ''){

    $.post('/', { trueUrl: $('#trueUrl').val() }, response =>{

      $('.shortenUrl').text( 'mcafe.one/r/' + response )

      console.log($('#trueUrl').val())

    })
  }  
})