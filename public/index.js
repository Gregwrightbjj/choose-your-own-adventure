var x = function(){}
var templates = {}
var views = {}

var createDate = function(){
  var date = moment().format("ll");
  $(".date").html(date);
}



//Router
var Router = Backbone.Router.extend({

	routes:{
		"": "tableOfContents",
		"page/:pageNumber":"specificPage"
	},

	tableOfContents: function(){
		$.ajax({
			url: "/api/toc",
			method: "GET",
			success: function(data){
				views.toc.update(data)
				$("#stuff").html(views.toc.$el)
			}
		})
	},

	specificPage: function(pageNumber){
		$.ajax({
			url:"/api/page/:" +pageNumber,
			method: "GET",
			success:function(data){
				console.log(data)
				views.pages.update(data)
				$("#stuff").html(views.pages.$el)
			}
		})
	}
})

//Create new Router
var router = new Router()


//table of contents
var TocView = Backbone.View.extend({
	className: "bigT",
	initialize: function(){
		this.data = []
		this.render()
	},
	
	render: function(){
		console.log("Leila", this.data)
		this.$el.html(templates.Toc(this.data))
	},
	
	update: function(data){
		this.data = data
		this.render()
	}
	
})

//Pages view
var PagesView = Backbone.View.extend({
	className: "bigP",

	initialize: function(){
	
		this.data = {}
		this.render()
	},
	
	render: function(){
		console.log("Bella", this.data)
		this.$el.html(templates.Pages(this.data))
	},
	
	update: function(data){
		this.data = {
			a : data.paragraphs[0],
			b : data.paragraphs[0],
			c : data.paragraphs[0],
			d : data.paragraphs[0]
			
		}
		this.render()
	}
	
})

$(document).on("ready", function(){
	
	templates ={
		Toc: Handlebars.compile($("#toc-template").text() ),
		Pages: Handlebars.compile($("#pages-template").text() )

	}

	//Pages view instance
	views.pages = new PagesView()
	
	//Toc view instance 
	views.toc = new TocView() 
	//new Router
	var router = new Router()
	//creates date
	createDate()

	//initiates routes
	Backbone.history.start()

})