let express = require('express');
let Pool = require('pg').Pool;
let bodyParser = require('body-parser');

const app = express();

var config ={
    host: 'localhost',
    user: 'webuser',
    password : 'i2E1CUXs',
    database: 'workshop',

}

var pool = new Pool(config);


app.set('port',(8080));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', async (req,res) => {
    if(req.query.workshop){
    try {
        const ws = req.query.workshop;
        const response = await
        pool.query('select attendee from workshop_table where workshop=($1)', [ws]);
        console.log(response);
        console.log(response.rowCount);
        if (response.rowCount > 0) {
            var attendees = response.rows.map(function (item) {
                return item.attendee;
            });
            res.json({'attendees': attendees});

        } else {
            res.json({'error': "workshop not found"});
        }


    }
    catch (err) {
        console.error("Error query api0" + err);
    }
}
else{
    try {
        const response = await pool.query('select distinct workshop from workshop_table');
        console.log(response);
        var workshopNames = response.rows.map(function(item){
            return item.workshop;
        });



        res.json({'workshops':workshopNames});
    }
    catch(err){
        console.error("Error query api"+err);
    }
}});


app.post('/api', async (req,res)=> {
``
    var attendee = req.body.attendee;
    var workshop = req.body.workshop;
    if (attendee ==="" || workshop===""){
        res.json({'error':'parameters not given'});
        console.log('error parameters not given');
    }
    else{

       try {

           const response1 =  await pool.query('select * from workshop_table where workshop=($1) and attendee=($2)' , [ workshop,attendee]);
           console.log(response1.rowCount>0);
           if(response1.rowCount>0){
               res.json({'error':'attendee already enrolled'});
               console.log('error attendee already enrolled');
           } else{
               const response2 =  await pool.query('insert into workshop_table (attendee, workshop) values ($1, $2)',[attendee,workshop]);
               res.json({'attendee':attendee, 'workshop': workshop});
               console.log('inserted!');

           }
       }
       catch (err) {
           console.error("Error insert add" + err);
       }
    }

    
})


app.get('/hello', async(req,res)=>{
    res.json({'response':'Hello World!'});
});


app.listen(app.get('port'), ()=> {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`)
});