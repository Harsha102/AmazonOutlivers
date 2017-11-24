var Target: Transform;
var lookAtDistance = 30.0;
var attackRange = 10.0;
var moveSpeed = 5.0;
var wanderSpeed = 4.0;
var speed : int = 8;

//var Damping = 6.0;
//var HealthDistance = 3.0;
//var healthFallRate : int = 25;
var timer = 20.0;
var wanderTimer = 15.0;
var InitY;
var randDir: Vector3;
public var rend: Renderer;
private var playerGUI : PlayerGUI;
private var deerGUI :Deer;
var healthBarDisplay : float = 100;
var Deer : GameObject;
var minThresh: float = 5;
var healthBar : GameObject;
private var inventory : Inventory;

function Start()
{
	playerGUI = GameObject.Find("First Person Controller").GetComponent(PlayerGUI);	
	//deerGUI=this.GameObject.GetComponent(Deer);
	rend = GetComponent.<Renderer>();
	timer = wanderTimer;
	InitY = transform.position.y;
	Deer = this.gameObject;
	GetComponent.<Rigidbody>().isKinematic = true;
	inventory = GameObject.Find("First Person Controller").GetComponent(Inventory);
}

function Update()
{
	// Algorithm implemented : Leave by Character, Seek/Wander by Animal.
	timer += Time.deltaTime;
	var distance = Vector3.Distance(Target.position, transform.position);

	if (distance < lookAtDistance) {
		rend.material.color = Color.yellow;
		//deerGUI.isVisible=true;
		flee();
	} else {
		//deerGUI.isVisible=false;
		rend.material.color = Color.green;
		wander();
	}
	transform.position.y = InitY;
	
	if (distance < minThresh) {
		healthBarDisplay-=2f;
	}
	if(healthBarDisplay <= 0)
	{
		DestroyDeer();
	}
	healthBar.transform.localScale = new Vector3(healthBarDisplay/100.0, healthBar.transform.localScale.y, healthBar.transform.localScale.z);
}

function DestroyDeer()
{
	Destroy(Deer);
	inventory.Food+=10;
}

function flee()
{
	var vec :Vector3;
	vec.x=0;
	vec.y=0;
	vec.z=-1;
	transform.LookAt(Target);
	transform.Translate(vec * moveSpeed * Time.deltaTime);
}

function wander()
{
	if (timer >= wanderTimer) {
		randDir = Random.insideUnitSphere;
		randDir.y = 0.0;
		timer = 0.0;
	}
	transform.Translate(randDir * wanderSpeed * Time.deltaTime);
}
