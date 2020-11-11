# authAPIs
this is registration and authentication nodejs REST API. 

this API End Point is: 

registration -> Host/api/register
{
    "fullName" : "YOUR NAME",
    "email" : "XXXX@domain.com",
    "password" : "xxxxxxxx" // min lenght 4 character
}

login -> host/api/authenticate
{
    "email" : "XXXX@domain.com",
    "password" : "xxxxxxx"
}

profile & your custom private routes

profile -> host/api/userProfile

header:
key - Authorization
value - Bearer YOUR TOKEN

