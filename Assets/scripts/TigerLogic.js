var Target: Transform;
var lookAtDistance = 50.0;
var attackRange = 40.0;
var moveSpeed = 3.0;
var wanderSpeed = 5.0;
var attackSpeed = 5.0;
var Damping = 6.0;
var HealthDistance = 5.0;
var healthFallRate : int = 12;
var timer = 10.0;
var wanderTimer = 10.0;
var minThresh = 5.0;
var InitY;
var randDir: Vector3;
// public var rend: Renderer;
private var playerGUI : PlayerGUI;

function Start()
{
	playerGUI = GameObject.Find("First Person Controller").GetComponent(PlayerGUI);	
	timer = wanderTimer;
	InitY = transform.position.y;
}

function Update()
{
	
	timer += Time.deltaTime;
	var distance = Vector3.Distance(Target.position, transform.position);
	if (distance >= attackRange && distance < lookAtDistance) {
		GetComponent.<Animation>().Play("sound");
		GetComponent.<Animation>()["sound"].wrapMode = WrapMode.Loop;
		lookAt();
	} else if (distance >= attackRange){
		GetComponent.<Animation>().Play("walk");
		GetComponent.<Animation>()["walk"].wrapMode = WrapMode.Loop;
		wander();
	}
	if (distance < attackRange) {
		if (distance > minThresh) {
			GetComponent.<Animation>().Play("run");
			GetComponent.<Animation>()["run"].wrapMode = WrapMode.Loop;
			attack();
		} else {
			GetComponent.<Animation>().Play("hit");
			GetComponent.<Animation>()["hit"].wrapMode = WrapMode.Loop;
		}
	}
	if (distance < HealthDistance) {
		playerGUI.healthBarDisplay -= Time.deltaTime / healthFallRate;
	}
	transform.position.y = InitY;
}

function lookAt()
{
	transform.LookAt(Target);  //directly used LookAt function to align itself to target
}

function attack()
{
	
	var p : Vector3;
	p = (Target.position - transform.position);   //getting seek position   
	p.Normalize();             //making it unit vector
	p = ( p * attackSpeed * Time.deltaTime);    
	p.y = 0;                      //restricting upward movement
	transform.LookAt(Target);   //Align itself to target
	transform.Translate(p);      //Translate function makes the animal to move along p
}

function wander()
{	//wanderTime is the time after which it changes its direction.we have used it to ensure smooth movement 
	if (timer >= wanderTimer) {
		randDir = Random.insideUnitSphere;   //gives random point on sphere
		randDir.x = 0.0;                     
		randDir.z = 0.0;                     //putting required coordinates to zero to prevent upward movement
		randDir.y=-(randDir.y);              
		timer = 0.0;
	}
	if (timer >= wanderTimer - 10*Time.deltaTime)
		transform.Rotate(randDir * 10);      //rotating the animal in that random direction
	;
	else {
		var p : Vector3;
		p = (Vector3.forward * wanderSpeed * Time.deltaTime);
		p.y = 0;
		transform.Translate(p);               //translating animal in that direction
	}
		
}
