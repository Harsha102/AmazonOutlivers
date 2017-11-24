#pragma strict

var rayLength : int = 15;

private var inventory : Inventory;

private var guiShow : boolean = false;

function Start()
{
	inventory = GameObject.Find("First Person Controller").GetComponent(Inventory);
}

function Update()
{
	var hit : RaycastHit;
	var fwd = transform.TransformDirection(Vector3.forward);
	
	if(Physics.Raycast(transform.position, fwd, hit, rayLength))
	{
		var colwoods: GameObject[];
		if(hit.collider.gameObject.tag == "Wood" || hit.collider.gameObject.tag == "Coconut")
		{			
			guiShow = true;
			
			if(Input.GetKeyDown("e"))
			{
				colwoods = GameObject.FindGameObjectsWithTag("Wood");
				for (var colwood: GameObject in colwoods) {
					Destroy(colwood);
					inventory.wood++;
				}
				colwoods = GameObject.FindGameObjectsWithTag("Coconut");
				for (var colwood: GameObject in colwoods) {
					Destroy(colwood);
					inventory.bottledWater++;
				}
				
				//Destroy(hit.collider.gameObject);
				guiShow = false;
			}
		}
		/*else if (hit.collider.gameObject.tag == "Coconut")
		{
			guiShow = true;
			
			if(Input.GetKeyDown("e"))
			{
				inventory.bottledWater++;
				Destroy(hit.collider.gameObject);
				guiShow = false;
			}
		}*/
		else
		{
			guiShow = false;
		}
	}
}


function OnGUI()
{
	if(guiShow == true)
	{
		GUI.Box(Rect(Screen.width / 2 - 150, Screen.height / 2 - 150, 100, 20), "PICKUP!");
	}
}








































