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
	transform.LookAt(Target);
}

function attack()
{
	// lookAt();
	var p : Vector3;
	p = (Target.position - transform.position);
	p.Normalize();
	p = ( p * attackSpeed * Time.deltaTime);
	p.y = 0;
	transform.LookAt(Target);
	transform.Translate(p);
}

function wander()
{	
	if (timer >= wanderTimer) {
		randDir = Random.insideUnitSphere;
		randDir.x = 0.0;
		randDir.z = 0.0;
		randDir.y=-(randDir.y);
		timer = 0.0;
	}
	if (timer >= wanderTimer - 10*Time.deltaTime)
		transform.Rotate(randDir * 10);
	;
	else {
		var p : Vector3;
		p = (Vector3.forward * wanderSpeed * Time.deltaTime);
		p.y = 0;
		transform.Translate(p);
	}
		// transform.Translate(Vector3.forward * wanderSpeed * Time.deltaTime);
}
