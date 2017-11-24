#pragma strict

var menuSkin : GUISkin;

var wood : int = 0;
var ropes: int = 0;
var Food : int = 0;
var bottledWater : int = 0;
var healthKits : int = 0;
var minimumVal : int = 0;
var setTxt : UnityEngine.UI.Text;

private var showGUI : boolean = false;

private var playerGUI : PlayerGUI;

function Start()
{
	playerGUI = GameObject.Find("First Person Controller").GetComponent(PlayerGUI);	
}

function Update()
{
	if(wood <= 0)
	{
		wood = minimumVal;
	}
	
	if(Food <= 0)
	{
		Food = minimumVal;
	}
	
	if(ropes <= 0)
	{
		ropes = minimumVal;
	}
	
	if(bottledWater <= 0)
	{
		bottledWater = minimumVal;
	}
	
	if(bottledWater <= 0)
	{
		bottledWater = minimumVal;
	}
	
	if(healthKits <= 0)
	{
		healthKits = minimumVal;
	}
	
	if(Input.GetKeyDown("i"))
	{
		showGUI = !showGUI;
	}
	
	if (wood >= 6) {
		Win();
	}
	
	if(showGUI == true)
	{
		Time.timeScale = 0;
		GameObject.Find("First Person Controller").GetComponent(FPSInputController).enabled = false;
		// GameObject.Find("First Person Controller").GetComponent(MouseLook).enabled = false;
		//GameObject.Find("Main Camera").GetComponent(MouseLook).enabled = false;
		GameObject.Find("FPSArms_Axe@Idle").GetComponent(PlayerControl).enabled = false;
		GameObject.Find("Main Camera").GetComponent(RayCastCollect).enabled = false;
	}
	
	if(showGUI == false)
	{
		Time.timeScale = 1;
		GameObject.Find("First Person Controller").GetComponent(FPSInputController).enabled = true;
		//GameObject.Find("First Person Controller").GetComponent(MouseLook).enabled = true;
		//GameObject.Find("Main Camera").GetComponent(MouseLook).enabled = true;
		GameObject.Find("FPSArms_Axe@Idle").GetComponent(PlayerControl).enabled = true;
		GameObject.Find("Main Camera").GetComponent(RayCastCollect).enabled = true;
	}
}


function Win()
{	
	setTxt.text = "You got a boat!! Now you can escape from this Island!!";
}

function OnGUI()
{
	if(showGUI == true)
	{
		GUI.skin = menuSkin;
			GUI.BeginGroup(new Rect(Screen.width / 2 - 150, Screen.height / 2 - 150, 300, 300));
				GUI.Box(Rect(0, 0, 300, 300), "Basic Inventory");
				
				//Resources collected
				GUI.Label(Rect(10, 50, 50, 50), "Wood");
				GUI.Box(Rect(60, 50, 20, 20), "" + wood);
				
				GUI.Label(Rect(90, 50, 50, 50), "ropes");
				GUI.Box(Rect(130, 50, 20, 20), "" + ropes);
				
				//Edable items
				GUI.Label(Rect(10, 190, 50, 50), "Food");
				GUI.Box(Rect(60, 190, 20, 20), "" + Food);
				if(GUI.Button(Rect(100, 190, 100, 20), "Eat Food?"))
				{
					if(Food >= 1)
					{
						Food--;
						Eat();
					}
				}
				
				GUI.Label(Rect(10, 210, 50, 50), "BWater");
				GUI.Box(Rect(60, 210, 20, 20), "" + bottledWater);
				if(GUI.Button(Rect(100, 210, 100, 20), "Drink Water?"))
				{
					if(bottledWater >= 1)
					{
						bottledWater--;
						Drink();
					}
				}
				
				GUI.Label(Rect(10, 240, 50, 50), "healthKits");
				GUI.Box(Rect(60, 240, 20, 20), "" + healthKits);
				if(GUI.Button(Rect(100, 240, 100, 20), "Boost your health?"))
				{
					if(healthKits >= 1)
					{
						healthKits--;
						Heal();
					}
				}
				GUI.EndGroup();
	}
}

function Eat()
{
	playerGUI.hungerBarDisplay += 0.1;
	playerGUI.healthBarDisplay += 0.1;
}

function Drink()
{
	playerGUI.thirstBarDisplay += 0.1;
	playerGUI.healthBarDisplay += 0.1;
}

function Heal()
{
	playerGUI.thirstBarDisplay += 0.3;
	playerGUI.hungerBarDisplay += 0.3;
	playerGUI.healthBarDisplay += 0.5;
	if (playerGUI.thirstBarDisplay > 1.0) {
		playerGUI.thirstBarDisplay = 1.0;
	}
	if (playerGUI.hungerBarDisplay > 1.0) {
		playerGUI.hungerBarDisplay = 1.0;
	}
	if (playerGUI.healthBarDisplay > 1.0) {
		playerGUI.healthBarDisplay = 1.0;
	}
}























































