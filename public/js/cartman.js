var cartData=[
{ "name": "Lusicious Jello Mix","description": ["Very Elegant", "Trending item", "Come in Purple"], "price": 80.65 },
{ "name": "Tarnished Standing Desk", "description": ["Modular", "Works for both Tall and Loud People", "Smells like Productivity"], "price": 1654.99},
{ "name": "Hand-made Hand Grenades", "description": ["Such gift!", "Much boom!", "Very safe for kids"], "price": 10.44},
{ "name": "Pan-fried Cookie Dough", "description": ["Chocolate", "Family-size", "Hot Mess"], "price": 16.99 },
{ "name": "Fancy Dress Hanger", "description": ["Keep organized", "On Sale"], "price": 67.32 },
{ "name": "Snarky Britsh Mustache 3-Pack", "description": ["Sharing is caring!", "Hugs not drugs", "As seen on 'So You Think You Can Dance - Nigeria!'"], "price": 1.99 },
];

var quantityList=[];

function createQuantityList(min,max)
{
  for(i=min;i<=max;i++)
  {
  	quantityList.push({"value":i,"text":i});
  }
}

function createCartItemList()
{
	var container=document.getElementById("container");
	var subTotalValue=0;

	for(var i=0;i<cartData.length;i++)
	{
		var newRow=createItemDivRow(cartData[i],i);
		container.appendChild(newRow);
		subTotalValue+=cartData[i].price;
	}

	var totalsRow=createItemTotals("Subtotal",subTotalValue);
	container.appendChild(totalsRow);

	var buttonRow=createDivButtonRow();
	container.appendChild(buttonRow);
}

function createItemDivRow(cartItem, itemNumber)
{
	var divRow=document.createElement("div");
	divRow.setAttribute("id","item"+itemNumber);
	divRow.setAttribute("class","itemRow");

	var rowHr=document.createElement("hr");
	rowHr.setAttribute("class","rowHr");

	divRow.appendChild(rowHr);
	divRow.appendChild(createSpanImage("images/cart.svg"));
	divRow.appendChild(createSpanDescription(cartItem));	

	if(quantityList.length!==0)
	{
		var quantityDropDown=createSelectOptionList(itemNumber,quantityList);
		divRow.appendChild(quantityDropDown);
	}

	divRow.appendChild(createSpanPrice(cartItem.price,"price" + itemNumber));
	divRow.appendChild(createSpanSubTotal(cartItem.price,"subTotal" + itemNumber));

	return divRow;
}

function createItemTotals(totalsLabelString, totalsAmountValue)
{
    var divRow=document.createElement("div");
	divRow.setAttribute("id","itemTotals");

	var rowHr=document.createElement("hr");
	rowHr.setAttribute("class","rowHr");

	divRow.appendChild(rowHr);
	divRow.appendChild(createSpanBack("","totalsSpace",""));
	divRow.appendChild(createSpanBack("","totalsLabel",totalsLabelString));
	divRow.appendChild(createSpanWithIdBack("","totalsAmount","$"+totalsAmountValue,"totalsAmountId"));	

	return divRow;
}

function createDivButtonRow(){
	var divRow=document.createElement("div");
	divRow.setAttribute("id","updateButtonRow");

	var updateButton=document.createElement("button");
	updateButton.setAttribute("class","pageButton");

	addToUpdateButtonListener(updateButton);

	var rowBread=document.createElement("br");
	var buttonTextNode=document.createTextNode("Update Total");

	divRow.appendChild(rowBread);
	divRow.appendChild(createSpanBack("","totalsSpace",""));
	divRow.appendChild(createSpanBack("","totalsLabel",""));

	updateButton.appendChild(buttonTextNode);
	divRow.appendChild(updateButton);

	return divRow;
}

function createSpanImage(itemImagePath)
{
	var thisSpan=createSpanBack("wouldBeName", "itemImage", "");
	var imageSrc=document.createElement("img");
	imageSrc.setAttribute("src",itemImagePath);
	thisSpan.appendChild(imageSrc);
	return thisSpan;
}

function createSpanDescription(cartItem)
{
	var thisSpanDescription=document.createElement("span");
	thisSpanDescription.setAttribute("class","itemDescription");

	var mainSubBreak=document.createElement("br");
	var mainDecription=createSpanBack("wouldBeName", "mainDecription", cartItem.name);
	var subDecription=createSpanBack("wouldBeName", "subDecription", cartItem.description);
	
	thisSpanDescription.appendChild(mainDecription);
	thisSpanDescription.appendChild(mainSubBreak);
	thisSpanDescription.appendChild(subDecription);

return thisSpanDescription;
}

function createSpanPrice(itemPrice,itemPriceId)
{
	return createSpanWithIdBack("wouldBeName", "itemPrice", "$" + itemPrice,itemPriceId);
}

function createSpanSubTotal(itemSubTotal,itemSubTotalId)
{
	return createSpanWithIdBack("wouldBeName", "itemSubTotal", "$" + itemSubTotal,itemSubTotalId);
}

function createSpanBack(spanName, spanclassName, spanTextValue)
{
	var newSpan=document.createElement("span");
	newSpan.setAttribute("class",spanclassName);

	var textNode=document.createTextNode(spanTextValue);
	newSpan.appendChild(textNode);

	return newSpan;
}

function createSpanWithIdBack(spanName, spanclassName, spanTextValue,spanId)
{
	var thisSpan=createSpanBack(spanName, spanclassName, spanTextValue);
	thisSpan.setAttribute("id",spanId);
    return thisSpan;
}

function createSelectOptionList(thisId,values)
{
   var thisSelectSpan=document.createElement("span");
   thisSelectSpan.setAttribute("class","selectSpan");
   var thisSelect=document.createElement("select");
   thisSelect.setAttribute("id","select"+thisId);

   /******* Uncomment/comment Below for DropDown to work  *********/
   addToSelectListener(thisSelect);

   for(var i=0;i<values.length;i++)
   {
   	   var thisOption=document.createElement("option");
   	   thisOption.setAttribute("value",values[i].value);
   	   var thisTextNode=document.createTextNode(values[i].text);
   	   thisOption.appendChild(thisTextNode);

   	   thisSelect.appendChild(thisOption);
   }

   thisSelectSpan.appendChild(thisSelect);
 
    return thisSelectSpan;
}


function addToSelectListener(thisElement)
{
	function updateSubTotalsEvent(thisElement){
		updateSubTotals(thisElement);  // thisElement Not needed;		
	}

	thisElement.addEventListener('change',updateSubTotalsEvent);
}

function addToUpdateButtonListener(thisElement)
{
	function updateTotals(){
		updateTotalAmount();  // thisElement Not needed;		
	}

	thisElement.addEventListener('click',updateTotals);
}

function updateSubTotals(thisElement)
{
	var targetElement=thisElement.currentTarget;

	var thisId=targetElement.id;
	var selectIdNumber=thisId.replace("select","");

	var thisPrice=document.getElementById("price" + selectIdNumber).innerHTML.replace("$","");   	  

	var thisSelect=document.getElementById("select"+selectIdNumber).value;
	var newSubTotal=thisPrice*thisSelect;

	var thisSubTotal=document.getElementById("subTotal"+selectIdNumber);

	var thisSubTotalTextNode=thisSubTotal.childNodes[0];


	thisSubTotalTextNode.nodeValue= "$" + newSubTotal.toFixed(2);
}

function updateTotalAmount()
{
   var itemSubTotals=document.getElementsByClassName("itemSubTotal");
   var totalAmount=0;
   var thisSubTotalAmount=0;

   for(var i=0;i<itemSubTotals.length;i++)
   {
   	  thisSubTotalAmount=itemSubTotals[i].innerHTML.replace("$","");   	  
   	   totalAmount+=parseFloat(thisSubTotalAmount);  //.toFixed(2) + parseFloat(priceString)
   }

   var totalPriceSpan=document.getElementById("totalsAmountId");
   var totalPriceTextNode=totalPriceSpan.childNodes[0];


   totalPriceTextNode.nodeValue= "$" + totalAmount.toFixed(2);
}