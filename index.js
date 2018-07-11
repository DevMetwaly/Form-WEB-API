let employeesData; 

window.onload=function(){
    $('#AddEmpForm').on('submit',function(event){
        if(event.type === 'submit')
            event.preventDefault();	

        let employeeData ={
            "Name": $('#name').val(),
            "Mobile": $('#mobile').val(),
            "Telephone": $('#telephone').val(),
            "address": $('#address').val(),
            "UserName": $('#username').val(),
            "Password": $('#password').val()
        };
        
        $.ajax({
            url: 'http://employeesintern.azurewebsites.net/api/employees',
            type: 'POST',    
            data: JSON.stringify(employeeData),
            contentType: 'application/json',
            success: function(result) {
                getData(false);
                displayEmployeesData();
                document.getElementById("AddEmpForm").reset();
                alert("Added Successfully");
            }
        });  
        
    });

    // Edit an employee
    $('#modifiyButton').click(function(){
        let employeeData ={
            "Name": $('#name').val(),
            "Mobile": $('#mobile').val(),
            "Telephone": $('#telephone').val(),
            "address": $('#address').val(),
            "UserName": $('#username').val(),
            "Password": $('#password').val()
        };
        $.ajax({
            url: `http://employeesintern.azurewebsites.net/api/employees/${$('#modifiyButton').val()}`,
            type: 'PUT',    
            contentType: 'application/json',
            data: JSON.stringify(employeeData),
            success: function(result) {
                getData(false);
                displayEmployeesData();
                document.getElementById("AddEmpForm").reset();
                $('#modifiyButton').prop('disabled', true);
                alert('Data changed successfully');
            }
        });  


        
    });

    // On-typing search for an employee based on his ID and display his data
    $('input[name=search]').keyup(function() { 
        displayEmployeesData($('input[name=search]').val());
    });

    getData(false); //get data and store it in employeesData, asynchronous=false
    displayEmployeesData();
}



function getData(async=true){
    $.ajax({
        url: 'http://employeesintern.azurewebsites.net/api/employees',
        type: 'GET',    
        async : async,
        datatype: 'application/json',
        success: function(data) {
            employeesData = data;
        }
    }); 
}



// Fill employees table
function displayEmployeesData(id=''){
    let table = $('#employeeDataTable');
    table.empty();

    for(obj of employeesData){
        if(id=='' || id==obj['id']){
            table.append('<tr>');
            let ID;
            for(attribute in obj){
                if(attribute === 'id'){
                    ID = obj[attribute];
                    table.append(`<th scope="col"> ${ID} </th>`)    
                }
                else 
                    table.append(`<td scope="col"> ${obj[attribute]} </td>`)
            }  
            table.append(`<td>
                        <button value ='${ID}' type="button" class="btn btn-default btn-danger glyphicon glyphicon-remove" onclick='deleteEmployeeData(this.value)' onfocus="this.blur()"></button>
                        <button value = '${ID}' type="button" class="btn btn-default btn-primary" onclick='editEmployeeData(this.value)' onfocus="this.blur()">Edit</button>
                        </td>`);
            table.append('</tr>');
        }
    }
}





//delete employee data based on id 
function deleteEmployeeData(id){
    $.ajax({
        type: "DELETE",
        url: "http://employeesintern.azurewebsites.net/api/employees/"+id,
        success: function(data){
            getData(false);
            $('input[name=search]').val('');
            displayEmployeesData('');
            alert("Deleted successfully");
        }
    });
}


function editEmployeeData(id){
    
    $('#modifiyButton').prop('disabled', false);

    $("#modifiyButton").val(id);
    let employee = employeesData.find(obj => obj['id']==id);
    $('#name').val(employee.name);
    $('#mobile').val(employee.mobile);
    $('#telephone').val(employee.telephone);
    $('#address').val(employee.address);
    $('#username').val(employee.userName);
    $('#password').val(employee.password);
}