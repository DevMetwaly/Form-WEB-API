let idLimit=0;
window.onload=function(){
    $('#AddEmpForm').on('submit',function(event){
        if(event.type === 'submit')
            event.preventDefault();	
        let name    = $('#name').val();
        let mobile  = $('#mobile').val();
        let tele    = $('#telephone').val();
        let address = $('#address').val();
        let userName= $('#username').val();
        let password    = $('#password').val();
        let employeeData ={
            "Id": idLimit,
            "Name": name,
            "Mobile": mobile,
            "Telephone": tele,
            "address": address,
            "UserName": userName,
            "Password": password
        };
        //alert(JSON.stringify(employeeData));
        $.ajax({
            url: 'http://employeesintern.azurewebsites.net/api/employees',
            type: 'POST',    
            data: JSON.stringify(employeeData),
            contentType: 'application/json',
            success: function(result) {
                idLimit+=1;
                alert("Added Successfully");
            }
        });
        
    });
    
    
    displayEmployeesData('');

    $('input[name=search]').keyup(function() { 
            displayEmployeesData($('input[name=search]').val());

    });

     
}
function displayEmployeesData(id){
    let table = $('#employeeDataTable');
    table.empty();
    if(id == '')
    $.get("http://employeesintern.azurewebsites.net/api/employees", function(data, status){
        
        for(obj of data){
            table.append('<tr>');
            let ID;
            for(attribute in obj){
                if(attribute === 'id'){
                    ID = obj[attribute];
                    table.append(`<th scope="col"> ${ID} </th>`)    
                    if(ID>idLimit) idLimit=ID+1;
                }
                else 
                    table.append(`<td scope="col"> ${obj[attribute]} </td>`)
            }  
            table.append(`<td>
                        <button value ='${ID}' type="button" class="btn btn-default btn-danger glyphicon glyphicon-remove" onclick='deleteEmployeeData(this.value)'></button>
                        <button type="button" class="btn btn-default btn-primary">Edit</button>
                        </td>`);
            table.append('</tr>');
        }
    });  
    else{
        alert();
    }
}
function deleteEmployeeData(id){
    $.ajax({
        type: "DELETE",
        url: "http://employeesintern.azurewebsites.net/api/employees/"+id,
        success: function(data){
            alert("deleted successfully");
            $('input[name=search]').val = '';
            displayEmployeesData('');
        }
    })

}