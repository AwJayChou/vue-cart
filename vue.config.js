module.exports = {
  configureWebpack: {
      devServer: {
          before (app) {
              app.get('/api/goods', function(req,res){
                  res.json({
                      code: 0,
                      list: [
                        {text:'商品1',price:'100',id:1},
                        {text:'商品2',price:'200',id:2},
                        {text:'商品3',price:'300',id:3},
                        {text:'商品4',price:'400',id:4},
                        ],
                  })
              })
          }
      }
  }
}