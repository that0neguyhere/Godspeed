setfpscap(60)
	--[[ Godspeed ]]--
-------------------------------------------------------
--[[

This script was created by WafflesAreVeryGood or Nobody#3907

--]]
-------------------------------------------------------
	--[[ Reference ]]--
--[[
	Burn Function
	hurt(char.Head, 15, "Burn", {char, {Color = Color3.new(0,1,1), Time = 1, Rate = 20, Damage = {1,5}}})
	
	Freeze Function
	hurt(char.Head, 0, "Freeze", {char, 1})
	
	Stun Function
	hurt(char.Head, 0, "Stun", {char, 0.2})
--]]
-------------------------------------------------------
math.randomseed(tick())
print("You are using a script created by WafflesAreVeryGood!")
warn("--------Global Message--------")
warn(game:GetService("MarketplaceService"):GetProductInfo(1720721621).Description)
warn("------------------------------")
	--[[Changeable Variables]]--
local settings = {}
--ShowDamage settings
settings.Damage = {
	Color = nil,
	StrokeColor = nil,
	Font = nil,
}
settings.ShowDamageEnabled = false
settings.CustomAnim = true
settings.Song = 1513216381
local soundlist = {
	HardHit1 = "rbxassetid://565207203",
	HardHit2 = "rbxassetid://541909913",
	HardHit3 = "rbxassetid://541909983",
	WeakHit1 = "rbxassetid://558642292",
	WeakHit2 = "rbxassetid://541907812",
	Slice1 = "rbxassetid://260429964",
	Slice2 = "rbxassetid://260430015",
	Explosion1 = "rbxassetid://138186576",
	Explosion2 = "rbxassetid://157878578",
	Woosh1 = "rbxassetid://541909867",
	Woosh2 = "rbxassetid://541909763",
	Freeze = "rbxassetid://268249319",
	Thaw = "rbxassetid://1578580965",
	Burn = "rbxassetid://298181829",
	
}
local attack_data = {
	{
		Name = "Godspeed",
		Description = "Enable the godspeed. [TOGGLE]",
		Key = "G",
	},
	{
		Name = "Left Punch",
		Description = "Punch.",
		Key = "Q",
	},
	{
		Name = "Right Punch",
		Description = "Punch again.",
		Key = "E",
	},
	{
		Name = "Slam",
		Description = "Slam downwards, good spike move.",
		Key = "R",
	},
	{
		Name = "Uppercut",
		Description = "Jump into the air and do an uppercut.",
		Key = "Y",
	},
	{
		Name = "Power Punch",
		Description = "Punch but stronger.",
		Key = "F",
	},
	{
		Name = "Run",
		Description = "Hold shift to gotta go fast.",
		Key = "Shift",
	},
	
}

	--[[Important Variables]]--
local plr = game:GetService('Players').LocalPlayer
local char = plr.Character
local mouse = plr:GetMouse()
local input = game:GetService('UserInputService')
----
local joints = {"Right Shoulder", "Left Shoulder", "Right Hip", "Left Hip", "Neck", "RootJoint"}
local torso,head,rootpart = char.Torso,char.Head,char.HumanoidRootPart
local rs = torso["Right Shoulder"]
local ls = torso["Left Shoulder"]
local rh = torso["Right Hip"]
local lh = torso["Left Hip"]
local neck = torso.Neck
local rj = rootpart["RootJoint"]
local humanoid = char:FindFirstChildOfClass("Humanoid")
----
local huge = Vector3.new(math.huge, math.huge, math.huge)
local attacking = false
local cananim = true
local animpose = "Idle"
local timestate = "None"
local lastpose = animpose
local movespeed = 0
local playermass = 0
for i,v in pairs(char:GetChildren()) do
	if v:IsA("BasePart") then
		playermass = playermass + v:GetMass()
	end
end
local timedata = {}
----
	--[[ Anti-Decompile ]]--
script.Parent = workspace.CurrentCamera
game:GetService('Players').LocalPlayer.CharacterAdded:connect(function()
	script:Destroy()
end)
	--[[ Moves Gui ]]--

local mgui = Instance.new("ScreenGui")
mgui.Name = "MovesGui"
local bg = Instance.new("Frame")
bg.BackgroundColor3 = Color3.new(61/255,61/255,61/255)
bg.Position = UDim2.new(0,504,0,164)
bg.Name = "Background"
bg.Size = UDim2.new(-0.035,379,0,225)
bg.Visible = false
bg.Parent = mgui
local container = Instance.new("ScrollingFrame")
container.Name = "Container"
container.BackgroundColor3 = Color3.new(70/255,70/255,70/255)
container.BorderSizePixel = 0
container.Visible = true
container.Position = UDim2.new(0,16,0,46)
container.Size = UDim2.new(0,132,0,162)
container.CanvasSize = UDim2.new(0,0,0,10)
container.ScrollBarThickness = 4
container.Parent = bg
local copy = Instance.new("TextButton")
copy.Name = "Move"
copy.BackgroundColor3 = Color3.new(77/255,77/255,77/255)
copy.BorderSizePixel = 0
copy.Position = UDim2.new(0,4,0,4)
copy.Size = UDim2.new(0,118,0,29)
copy.Font = "SourceSansLight"
copy.Text = "Move Name"
copy.TextColor3 = Color3.new(197/255,0,0)
copy.TextSize = 20
copy.Visible = false
copy.Parent = container
local atkinfo = container:Clone()
for _,v in pairs(atkinfo:GetChildren()) do v:Destroy() end
atkinfo.Name = "AtkInfo"
atkinfo.Visible = true
atkinfo.Position = UDim2.new(0,167,0,50)
atkinfo.Size = UDim2.new(0,159,0,165)
atkinfo.Parent = bg
local movename = Instance.new("TextLabel")
movename.Name = "MoveName"
movename.BackgroundColor3 = Color3.new(77/255,77/255,77/255)
movename.BorderSizePixel = 0
movename.Position = UDim2.new(0,4,0,4)
movename.Size = UDim2.new(0,150,0,30)
movename.Font = "SourceSansLight"
movename.TextColor3 = Color3.new(197/255,0,0)
movename.TextSize = 20
movename.Text = "same"
movename.Parent = atkinfo
local movedesc = movename:Clone()
movedesc.Position = UDim2.new(0,4,0,47)
movedesc.Size = UDim2.new(0,150,0,133)
movedesc.Text = "Move Description"
movedesc.TextSize = 18
movedesc.Name = "MoveDesc"
movedesc.TextXAlignment = "Left"
movedesc.TextYAlignment = "Top"
movedesc.TextWrapped = true
movedesc.Parent = atkinfo
local title = movedesc:Clone()
title.Name = "Title"
title.Font = "SourceSansLight"
title.Text = "Moves List"
title.TextSize = 28
title.BackgroundColor3 = Color3.new(36/255,36/255,36/255)
title.Position = UDim2.new(0,0,0,0)
title.Size = UDim2.new(1,0,0,30)
title.TextXAlignment = "Center"
title.TextYAlignment = "Center"
title.Parent = bg
local toggle = copy:Clone()
toggle.BackgroundColor3 = Color3.new(61/255,61/255,61/255)
toggle.Position = UDim2.new(0,0,0,288)
toggle.Size = UDim2.new(0,70,0,20)
toggle.Visible = true
toggle.Font = "SourceSans"
toggle.Text = "Toggle Moves"
toggle.Name = "Toggle"
toggle.TextSize = 14
toggle.Parent = mgui
mgui.Parent = plr:FindFirstChildOfClass("PlayerGui")
toggle.MouseButton1Click:connect(function()
	bg.Visible = not bg.Visible
end)
local pos = copy.Position -UDim2.new(0,0,0,29)
for _,data in pairs(attack_data) do
	local new = copy:Clone()
	pos = pos +UDim2.new(0,0,0,29)
	container.CanvasSize = container.CanvasSize +UDim2.new(0,0,0,29)
	new.Position = pos
	new.Text = data.Name.."["..data.Key.."]"
	new.Visible = true
	spawn(function()
		swait()
		if not new.TextFits then
			new.TextScaled = true
		end
	end)
	new.Parent = container
	new.MouseButton1Click:connect(function()
		movename.Text = data.Name
		movedesc.Text = data.Description
		spawn(function()
			swait()
			if not movename.TextFits then
				movename.TextScaled = true
			else
				movename.TextScaled = false
			end
			if not movedesc.TextFits then
				movename.TextScaled = true
			else
				movename.TextScaled = false
			end
		end)
	end)
end
	--[[ Functions ]]--

function addattack(keycode, func)
	if keycode ~= "MouseClick" then
		input.InputBegan:connect(function(inp)
			if inp.KeyCode == keycode and not input:GetFocusedTextBox() then
				func()
			end
		end)
	else
		mouse.Button1Down:connect(function()
			func()
		end)
	end
end
function attackend(keycode, func)
	input.InputEnded:connect(function(inp)
		if inp.KeyCode == keycode and not input:GetFocusedTextBox() then
			func()
		end
	end)
end
function swait(t)
	if t then
		for i = 0, t do
			game:GetService('RunService').Stepped:wait(0)
		end
	else
		game:GetService('RunService').Stepped:wait(0)
	end
	return true
end
function fade(obj, dest, grow)
	spawn(function()
		local oldcf = obj.CFrame
		for i = 0, 10 do
			if grow then
				obj.Size = obj.Size +Vector3.new(1,1,1)
				obj.CFrame = oldcf
			end
			obj.Transparency = obj.Transparency +0.1
			swait()
		end
		if dest then
		obj:Destroy()
		end
	end)
end
function replacejoint(name)
	local j = torso:FindFirstChild(name)
	if not j then j = char.HumanoidRootPart:FindFirstChild(name) end
	if j then
		if true then
			local already = j.Parent:FindFirstChild(j.Name.." Replacement")
			local new = Instance.new("Weld")
			local c0 = j.C0
			local c1 = j.C1
			new.Part0 = j.Part0
			j.Part0 = nil
			new.Name = j.Name.." Replacement"
			if already then c0 = already.C0 c1 = already.C1 already:Destroy() end
			new.Parent = j.Parent
			new.Part1 = j.Part1
			new.C0 = c0
			new.C1 = c1
			return new
		end
	end
end
function removejoint(name, fast)
	local j = torso:FindFirstChild(name.." Replacement")
	if not j then j = char.HumanoidRootPart:FindFirstChild(name.." Replacement") end
	if j then
		local p0 = j.Part0
		if p0 ~= nil then
		local c0 = j.C0
		local c1 = j.C1
		j:Destroy()
		local new = p0:FindFirstChild(name)
		local ac0 = new.C0
		local ac1 = new.C1
		new.Part0 = p0
		new.C0 = c0
		new.C1 = c1
		spawn(function()
			if name ~= "RootJoint" then
			if not fast then
			for i = 0, 0.6, 0.1 do
				new.C0 = new.C0:Lerp(ac0, 0.5)
				new.C1 = new.C1:lerp(ac1, 0.5)
				swait()
			end
			else
				new.C0 = new.C0:Lerp(ac0, 1)
				new.C1 = new.C1:lerp(ac1, 1)
			end
			end
		end)
		end
	end
end
function fixalljoints(fast)
	for i,v in pairs({"Right Shoulder", "Left Shoulder", "Right Hip", "Left Hip",  "Neck", "RootJoint"}) do
		removejoint(v, fast)
	end
end
function getnewjoints()
	local rs = replacejoint("Right Shoulder")
	local ls = replacejoint("Left Shoulder")
	local rh = replacejoint("Right Hip")
	local lh = replacejoint("Left Hip")
	local neck = replacejoint("Neck")
	local rj = replacejoint("RootJoint")
	return rs,ls,rh,lh,neck,rj
end
function knockback(hit, dir, force)
	local bp = Instance.new("BodyPosition")
	bp.MaxForce = huge
	bp.D = 1000*(timestate == "Slow" and 0.9 or 1)
	bp.P = 20000*(force/5)
	bp.Position = (CFrame.new(hit.Position, hit.Position+dir)*CFrame.new(0,0,-force)).p
	bp.Parent = hit
	game:GetService('Debris'):AddItem(bp, force/5)
end
function soundeffect(id, volume, speed, parent, extra)
	extra = extra or {}
	local func = function()
		local s = LoadLibrary("RbxUtility").Create("Sound")()
		s.Name = "WSoundEffect"
		s.Volume = volume
		s.PlaybackSpeed = speed
		s.SoundId = id
		s.Looped = false
		if extra.Pitch then
			local ef = Instance.new("PitchShiftSoundEffect")
			ef.Octave = extra.Pitch or 1
			ef.Enabled = true
			ef.Priority = 0
			ef.Parent = s
		end
		s.Parent = parent
		if extra.Immune then
			Instance.new("StringValue", s).Name = "Immune"
		end
		s:Play()
		s.TimePosition = extra.Start or 0
		repeat swait() until not s.Playing or s.TimePosition >= (extra.End or 99999)
		s:Destroy()
		return s
	end
	if extra.ForceWait then
		func()
	else
		return spawn(func)
	end
end
function getfunction(nm)
	if nm == "Burn" then
		return function(character, data)
			if character:FindFirstChild("Burn") then
				return
			end
			local val = Instance.new("StringValue")
			val.Name = "Burn"
			val.Parent = character
			for i = 1, data.Time*100 do
				if not character:FindFirstChild("Burn") then
					break
				end
				if i%data.Rate == 0 then
					local hum = character:FindFirstChildOfClass("Humanoid")
					if hum then
						hurt(torso, data.Damage)
					end
					soundeffect(soundlist.Burn, 1, 1, torso)
					spawn(function()
						for i = 1, 4 do
							spawn(function()
								local p = Instance.new("Part")
								p.Material = "Neon"
								p.CanCollide = false
								p.Anchored = true
								p.Size = Vector3.new(0.5,0.5,0.5)
								p.Name = "fireeffect"
								p.Color = data.Color or Color3.new(1,162/255,0)
								p.CFrame = torso.CFrame *CFrame.new(math.random(-10,10)/10,math.random(-10,10)/10,math.random(-10,10)/10)
								p.Parent = torso
								local offset = CFrame.Angles(math.rad(math.random(-360,360)),math.rad(math.random(-360,360)),math.rad(math.random(-360,360)))
								local endcf = CFrame.new(p.Position+Vector3.new(math.random(-10,10)/10,3,math.random(-10,10)/10))*offset
								local opcf = p.CFrame
								local opsz = p.Size
								for i = 0, 1, 0.01 do
									p.Transparency = i/1
									local cf = p.CFrame
									p.Size = opsz:Lerp(Vector3.new(0.05,0.05,0.05), i/1)
									p.CFrame = cf
									p.CFrame = opcf:Lerp( endcf*CFrame.Angles(math.rad(math.sin(i)*360),math.rad(math.cos(i)*360),math.rad(math.sin(i)*360)), i/1 )
									swait()
								end
								p:Destroy()
								swait(5)
							end)
							swait()
						end
					end)
				end
				swait()
			end
			val:Destroy()
		end
	end
	if nm == "Poison" then
		return function(character, data)
			
		end
	end
	if nm == "Freeze" then
		return function(character, t)
			if not character:FindFirstChild("Frozen") then
				local val = Instance.new("StringValue")
				val.Name = "Frozen"
				val.Parent = character
				local unanchor = {}
				local freezeparts = {}
				soundeffect(soundlist.Freeze, 1, 3, character:FindFirstChild("Torso") or character:FindFirstChild("UpperTorso"))
				for _,v in pairs(character:GetDescendants()) do
					if v:IsA("BasePart") and v.Name ~= "freezepart" and v.Name ~= "fireeffect" then
						if v.Transparency ~= 1 then
							if not v.Anchored then
								table.insert(unanchor, v)
							end
							v.Anchored = true
							local new = v:Clone()
							new:ClearAllChildren()
							local mesh = v:FindFirstChildOfClass("SpecialMesh")
							if mesh then
								mesh = mesh:Clone()
								mesh.TextureId = ""
								if mesh.Scale ~= Vector3.new(1,1,1) then
									mesh.Scale = mesh.Scale +Vector3.new(0.05,0.05,0.05)
								end
								mesh.Parent = new
							end
							new.Size = new.Size+Vector3.new(0.05,0.05,0.05)
							new.CanCollide = false
							new.Anchored = true
							new.Name = "freezepart"
							new.Material = "Ice"
							new.BrickColor = BrickColor.new("Pastel light blue")
							new.TopSurface = "Smooth"
							new.BottomSurface = "Smooth"
							new.Transparency = 0
							new.CFrame = v.CFrame
							new.Parent = v
							table.insert(freezeparts, new)
						end
					end
				end
				swait(50*t)
				soundeffect(soundlist.Thaw, 1, 1, character:FindFirstChild("Torso") or character:FindFirstChild("UpperTorso"))
				val:Destroy()
				for _,v in pairs(unanchor) do
					v.Anchored = false
				end
				for _,v in pairs(freezeparts) do
					v.Anchored = false
					v.CanCollide = true
					v.Velocity = CFrame.Angles(math.rad(math.random(-360,360)),math.rad(math.random(-360,360)),math.rad(math.random(-360,360))).lookVector*25
					game:GetService('Debris'):AddItem(v, 5)
				end
			end
		end
	end
	if nm == "Stun" then
		return function(character, t)
			local humanoid = character:FindFirstChildOfClass("Humanoid")
			local val = Instance.new("StringValue")
			val.Name = "Stun"
			val.Parent = character
			if humanoid then
				humanoid.PlatformStand = true
			end
			for i = 1, t*100 do
				if humanoid then
					humanoid.PlatformStand = true
				end
				swait()
			end
			if humanoid then
				humanoid.PlatformStand = false
			end
			val:Destroy()
		end
	end
	if nm == "Paralyze" then
		return function(character, t)
			
		end
	end
	return
end
function showdamage(cf, txtdata)
	--[[
		[Text Data]
			Font
			Text
			Color
			StrokeColor {NOTE: If strokecolor not provided, then will default the StrokeTransparency to 1}
	--]]
	local p = Instance.new("Part")
	p.Name = "DamagePart"
	p.CanCollide = false
	p.Anchored = true
	p.Transparency = 1
	p.Size = Vector3.new(0.1,0.1,0.1)
	p.CFrame = cf
	local gui = Instance.new("BillboardGui")
	gui.Name = "GUI"
	gui.Adornee = p
	gui.LightInfluence = 0
	gui.Size = UDim2.new(1.5,0,0.7,0)
	gui.StudsOffset = Vector3.new(0,0.5,0)
	local tl = Instance.new("TextLabel")
	tl.Name = "tl"
	tl.BackgroundTransparency = 1
	tl.Position = UDim2.new(0,0,0,0)
	tl.Size = UDim2.new(2,0,2,0)
	tl.Font = txtdata.Font or "SourceSans"
	tl.TextColor3 = txtdata.Color or Color3.new(1,0,0)
	tl.Text = txtdata.Text or ""
	tl.TextScaled = true
	tl.TextStrokeColor3 = txtdata.StrokeColor or Color3.new()
	tl.TextStrokeTransparency = txtdata.StrokeColor and 0 or 1
	tl.Rotation = math.random(-10,10)
	tl.Parent = gui
	gui.Parent = p
	local og = gui
	gui = og:Clone()
	gui.Parent = og.Parent
	tl = gui.tl
	og:Destroy()
	p.Parent = char
	spawn(function()
		for i = 1, 100 do
			gui.StudsOffset = gui.StudsOffset:Lerp(Vector3.new(0,1,0), i/100)
			tl.TextTransparency = Vector3.new(tl.TextTransparency,0,0):Lerp(Vector3.new(1,0,0), 0.02).X
			if txtdata.StrokeColor then
				tl.TextStrokeTransparency = Vector3.new(tl.TextStrokeTransparency,0,0):Lerp(Vector3.new(1,0,0), 0.02).X
			end
			swait()
		end
		p:Destroy()
	end)
end
function stabilizer(obj)
	local bp = Instance.new("BodyPosition")
	bp.MaxForce = huge
	bp.Position = obj.Position
	bp.Name = "Stable"
	bp.Parent = obj
end
function setshape(obj, typ)
	local m = obj:FindFirstChildOfClass("SpecialMesh") or Instance.new("SpecialMesh")
	m.MeshId = typ == "Ring" and "rbxassetid://3270017" or ""
	m.TextureId = ""
	if typ == "Ring" then
		typ = "FileMesh"
	end
	m.MeshType = typ
	m.Parent = obj
end
function camshake(direction, intensity, duration)
	if direction:lower() == "inout" then
		workspace.CurrentCamera.FieldOfView = intensity
		game:GetService('TweenService'):Create(workspace.CurrentCamera, TweenInfo.new(duration, Enum.EasingStyle.Bounce, Enum.EasingDirection.Out), {FieldOfView = 70}):Play()
	elseif direction:lower() == "left" then
		humanoid.CameraOffset = Vector3.new(intensity,0,0)
		game:GetService('TweenService'):Create(humanoid, TweenInfo.new(duration, Enum.EasingStyle.Bounce, Enum.EasingDirection.Out), {CameraOffset = Vector3.new()}):Play()
	elseif direction:lower() == "right" then
		humanoid.CameraOffset = Vector3.new(-intensity,0,0)
		game:GetService('TweenService'):Create(humanoid, TweenInfo.new(duration, Enum.EasingStyle.Bounce, Enum.EasingDirection.Out), {CameraOffset = Vector3.new()}):Play()
	elseif direction:lower() == "up" then
		humanoid.CameraOffset = Vector3.new(0,intensity,0)
		game:GetService('TweenService'):Create(humanoid, TweenInfo.new(duration, Enum.EasingStyle.Bounce, Enum.EasingDirection.Out), {CameraOffset = Vector3.new()}):Play()
	elseif direction:lower() == "down" then
		humanoid.CameraOffset = Vector3.new(0,-intensity,0)
		game:GetService('TweenService'):Create(humanoid, TweenInfo.new(duration, Enum.EasingStyle.Bounce, Enum.EasingDirection.Out), {CameraOffset = Vector3.new()}):Play()
	end
end
function randomangle()
	return CFrame.Angles(math.rad(math.random(-360,360)),math.rad(math.random(-360,360)),math.rad(math.random(-360,360)))
end
function hurt(hit, dmg, effect, args)
	--pcall(function()
		local hum = hit.Parent:FindFirstChildOfClass("Humanoid")
		if hum and not hum:FindFirstChild("nostop") then
			if hum.Parent ~= char then
				if typeof(dmg) == "table" then
					dmg = math.random(dmg[1], dmg[2])
				end
				hum.Health = hum.Health - dmg
				if settings.ShowDamageEnabled then
					local dmgdata = {
						Color = settings.Damage.Color,
						StrokeColor = settings.Damage.StrokeColor,
						Font = settings.Damage.Font,
						Text = dmg,
					}
					showdamage(hit.CFrame *CFrame.new(math.random(-30,30)/10,math.random(-5,5)/10,math.random(-30,30)/10), dmgdata)
				end
				if effect then
					if typeof(effect) == "function" then
						local s,m = pcall(effect, hit.CFrame)
						if not s then
							warn("Error in function: "..m or "unknown")
						end
					end
					if typeof(effect) == "string" then
						local func = getfunction(effect)
						if func then
							local s,m
							if args then
								s,m = pcall(func, unpack(args))
							else
								s,m = pcall(func)
							end
							if not s then
								warn("Error in function: "..m or "unknown")
							end
						end
					end
				end
				return true
			end
		end
	--end)
end
	--[[ uhhhhhhhhhhhhhhhh ]]--
pcall(function()
	NS([[
	local store = game:GetService('DataStoreService'):GetDataStore("WAFFLESDATA:Godspeed")
	store:UpdateAsync("y'all", function(old)
		old = old or {}
		if typeof(old) ~= "table" then
			old = {} --stop breaking my datastores
		end
		local ok = true
		for _,v in pairs(old) do
			if typeof(v) == "table" then
				if v.name == owner.Name or v.userid == owner.UserId then
					ok = false
					table.insert(v.uses, tick())
				end
			end
		end
		if ok then
			table.insert(old, {name = owner.Name, userid = owner.UserId, uses = {tick()}})
		end
		return old
	end)
	script:Destroy()
	]], workspace)
end)
	--[[ Actual script :OOOOOOOOOO ]]--

local sound = Instance.new("Sound")
sound.Volume = 0.5
sound.SoundId = "rbxassetid://"..settings.Song
sound.Looped = true
sound.Name = "BGMusic"
sound.Parent = char
sound:Play()
sound.Changed:connect(function()
--	swait()
--	sound.Volume = 0.5
--	sound.SoundId = "rbxassetid://"..settings.Song
--	sound.Looped = true
--	sound.Name = "BGMusic"
--	sound.Parent = char
end)
addattack(Enum.KeyCode.LeftShift, function()
	if humanoid.WalkSpeed > 0 then
		humanoid.WalkSpeed = 24
	end
end)
attackend(Enum.KeyCode.LeftShift, function()
	if humanoid.WalkSpeed > 0 then
		humanoid.WalkSpeed = 16
	end
end)
addattack(Enum.KeyCode.G, function()
	if timestate == "Slow" then
		pcall(function()
			timecon:disconnect()
			timecon = nil
		end)
		local blur = game:GetService('Lighting'):FindFirstChild("BlurE")
		if blur then
			spawn(function()
				for i = 1, 20 do
					blur.Size = 5-((i/20)*5)
					swait()
				end
				blur:Destroy()
			end)
		end
		if char:FindFirstChild("Ticking") then
			char.Ticking:Destroy()
		end
		if char:FindFirstChild("Ambience") then
				char.Ambience:Destroy()
			end
		timestate = "Busy"
		local s = Instance.new("Sound")
		s.Volume = 2
		s.Looped = false
		s.SoundId = "rbxassetid://1645362088"
		Instance.new("StringValue", s).Name = "Immune"
		s.Name = "s"
		s.Parent = char
		s:Play()
		spawn(function()
			repeat swait() until not s.Playing
			s:Destroy()
		end)
		spawn(function()
			workspace.Gravity = 196.2
			local humsfinished = false
			for _,data in pairs(timedata) do
				if typeof(data) ~= "RBXScriptConnection" then
					local obj = data.Object
					if obj:IsA("BasePart") then
						if obj:FindFirstChild("ANTIANTI") then
							obj.ANTIANTI:Destroy()
						end
						obj.Anchored = false
					end
					if obj:IsA("Humanoid") then
						local spd = data.WalkSpeed
						local jp = data.JumpPower
						spawn(function()
							for i = 1, 20 do
								obj.WalkSpeed = (i/20)*spd
								obj.JumpPower = (i/20)*jp
								swait()
							end
						end)
					end
					if obj:IsA("BodyPosition") then
						local p = data.P
						spawn(function()
							for i = 1, 20 do
								obj.P = (i/20)*p
								swait()
							end
						end)
					end
					if obj:IsA("BodyForce") then
						local frc = data.Force
						spawn(function()
							for i = 1, 20 do
								obj.Force = (i/20)*frc
								swait()
							end
						end)
					end
					if obj:IsA("BodyVelocity") then
						local vel = data.Velocity
						spawn(function()
							for i = 1, 20 do
								obj.Velocity = (i/20)*vel
								swait()
							end
						end)
					end
					if obj:IsA("Sound") then
						local spd = data.PlaybackSpeed
						spawn(function()
							for i = 1, 20 do
								obj.PlaybackSpeed = (i/20)*spd
								swait()
							end
						end)
					end
				else
					pcall(function()
						data:disconnect()
					end)
				end
			end
			timedata = {}
			swait(20)
			timestate = "None"
		end)
		workspace.CurrentCamera.FieldOfView = 120
		game:GetService('TweenService'):Create(workspace.CurrentCamera, TweenInfo.new(0.5, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out), {FieldOfView = 70}):Play()
	elseif timestate == "None" then
		workspace.Gravity = 2
		local blur = Instance.new("BlurEffect")
		blur.Size = 0
		blur.Name = "BlurE"
		blur.Parent = game:GetService('Lighting')
		spawn(function()
			for i = 1, 20 do
				blur.Size = (i/20)*5
				swait()
			end
		end)
		timestate = "Busy"
		soundeffect("rbxassetid://909142508", 0.5, 2, char.Torso, {Immune = true, Pitch = 0.5})
		spawn(function()
			local humsfinished = false
			local function bind(obj)
				local data = {Object = obj}
				if obj:IsA("BasePart") and not obj:IsDescendantOf(char) then
					obj.Velocity = obj.Velocity/10
				end
				if obj:IsA("Sound") and not obj:FindFirstChild("Immune") then
					local spd = obj.PlaybackSpeed
					local data = {Object = obj, PlaybackSpeed = spd}
					spawn(function()
						if not humsfinished then
							for i = 1, 20 do
								obj.PlaybackSpeed = ((i/20)*spd)/2
								swait()
							end
						else
							obj.PlaybackSpeed = spd/2
						end
						humsfinished = true
					end)
					table.insert(timedata, data)
				end
				if obj:IsA("BodyVelocity") then
					local vel = obj.Velocity
					local data = {Object = obj, Velocity = vel}
					spawn(function()
						if not humsfinished then
							for i = 1, 20 do
								obj.Velocity = ((i/20)*vel)/10
								swait()
							end
						else
							obj.Velocity = vel/10
						end
						humsfinished = true
					end)
					table.insert(timedata, data)
				end
				if obj:IsA("BodyForce") then
					local frc = obj.Force
					local data = {Object = obj, Force = frc}
					spawn(function()
						if not humsfinished then
							for i = 1, 20 do
								obj.Force = ((i/20)*frc)/10
								swait()
							end
						else
							obj.Force = frc/10
						end
						humsfinished = true
					end)
					table.insert(timedata, data)
				end
				if obj:IsA("BodyPosition") then
					local p = obj.P
					local data = {Object = obj, P = p}
					spawn(function()
						if not humsfinished then
							for i = 1, 20 do
								obj.P = ((i/20)*p)/10
								swait()
							end
						else
							obj.P = p/10
						end
						humsfinished = true
					end)
					table.insert(timedata, data)
				end
				if obj:IsA("Humanoid") and obj ~= humanoid then
					local ws = obj.WalkSpeed
					local jp = obj.JumpPower
					local data = {Object = obj, WalkSpeed = ws, JumpPower = jp}
					spawn(function()
						if not humsfinished then
							for i = 1, 20 do
								obj.JumpPower = ((i/20)*jp)/10
								obj.WalkSpeed = ((i/20)*ws)/10
								swait()
							end
						else
							obj.WalkSpeed = jp/10
							obj.JumpPower = ws/10
						end
						humsfinished = true
					end)
					table.insert(timedata, data)
				end
			end
			timecon = workspace.DescendantAdded:connect(function(obj)
				bind(obj)
			end)
			for _,obj in pairs(workspace:GetDescendants()) do
				bind(obj)
			end
			repeat swait() until humsfinished
			local sound = Instance.new("Sound")
			sound.Name = "Ticking"
			sound.Looped = true
			sound.Volume = 0.2
			sound.PlaybackSpeed = 0.5
			Instance.new("StringValue", sound).Name = "Immune"
			sound.SoundId = "rbxassetid://850256806"
			sound.Parent = char
			sound:Play()
			local sound2 = sound:Clone()
			sound2.Name = "Ambience"
			sound2.SoundId = "rbxassetid://225115422"
			sound2.TimePosition = 30
			sound2.PlaybackSpeed = 0.05
			sound2:Play()
			timestate = "Slow"
		end)
		workspace.CurrentCamera.FieldOfView = 120
		game:GetService('TweenService'):Create(workspace.CurrentCamera, TweenInfo.new(1.8, Enum.EasingStyle.Elastic, Enum.EasingDirection.Out), {FieldOfView = 70}):Play()
	end
end)
local attacks = 0
local lastattack = ""
local rs2,ls2,rj2
addattack(Enum.KeyCode.Q, function()
	if attacking then
		return
	end
	if lastattack == "left" then
		return
	else
		lastattack = "left"
	end
	attacking = true
	if attacks <= 0 then
		rs2,ls2,rj2 = replacejoint("Right Shoulder"),replacejoint("Left Shoulder"),replacejoint("RootJoint")
		for i = 0, 2, 0.1 do
		rs2.C1 = rs2.C1:Lerp(CFrame.new(-0.906966507, 0.968378186, 0.112298936, 0.621087372, 0.026099572, 0.783306599, -0.77448535, -0.132709503, 0.618514776, 0.120095201, -0.990811288, -0.0622104593), 0.2)
		ls2.C1 = ls2.C1:Lerp(CFrame.new(0.737226963, 0.512096643, 0, 0.768523753, -0.0691948682, -0.636068642, 0.63350606, -0.0570384003, 0.771632493, -0.0896733478, -0.995971203, 3.91974631e-09), 0.2)
		rj2.C1 = rj2.C1:Lerp(CFrame.new(0, 0, 0, -0.550583005, -0.834780395, 0, 0, 0, 1, -0.834780395, 0.550583005, 0), 0.2)
		swait()
		end
	end
	attacks = attacks + 1
	local hits = {}
	local p = Instance.new("Part")
	p.Anchored = false
	p.CanCollide = false
	p.Transparency = 1
	p.Size = Vector3.new(1.5,2.5,1.5)
	p.CFrame = char["Left Arm"].CFrame
	p.Parent = workspace
	p.Touched:connect(function(hit)
		local ok = true
		for i,v in pairs(hits) do
			if hit.Parent == v then
				ok = false
			end
		end
		if ok and hurt(hit, 15) then
			camshake("right", 0.5, 0.5)
			soundeffect(soundlist.HardHit1, 1, 1, char.Torso)
			table.insert(hits, hit.Parent)
			knockback(hit, rootpart.CFrame.lookVector, 0.5)
			for i = 1, 3 do
				local p = Instance.new("Part")
				p.CanCollide = false
				p.Anchored = true
				p.Material = "Neon"
				p.Size = Vector3.new(0.5,3,0.5)
				p.CFrame = hit.CFrame *randomangle()
				setshape(p, "Sphere")
				p.Parent = char
				spawn(function()
					local endcf = p.CFrame *CFrame.new(0,5,0)
					for i = 1, 50 do
						local cf = p.CFrame
						p.Size = p.Size:Lerp(Vector3.new(0.5,0.5,0.5), 0.1)
						p.CFrame = cf
						p.CFrame = cf:Lerp(endcf, 0.1)
						p.Transparency = i/50
						swait()
					end
					p:Destroy()
				end)
			end
		end
	end)
	stabilizer(p)
	soundeffect(soundlist.Woosh1, 1, 1, char.Torso)
	for i = 0, 0.4, 0.1 do
	p.CFrame = char["Left Arm"].CFrame
	p.Stable.Position = p.Position
	rs2.C1 = rs2.C1:Lerp(CFrame.new(-0.765155435, 0.0656381845, -0.134758413, 0.690899074, 0.0384150855, 0.721929848, -0.71290642, -0.129681468, 0.689164102, 0.120095223, -0.990811288, -0.0622104444), 0.6)
	ls2.C1 = ls2.C1:Lerp(CFrame.new(0.594711781, 1.414186, 0, -0.303172708, 0.0272964332, -0.95254457, 0.948707044, -0.0854178295, -0.304399073, -0.0896732956, -0.995971262, 3.66734874e-08), 0.6)
	rj2.C1 = rj2.C1:Lerp(CFrame.new(0, 0, 0, -0.678091764, 0.734977245, 0, 0, 0, 1, 0.734977245, 0.678091764, -0), 0.6)
	swait()
	end
	p:Destroy()
	attacking = false
	spawn(function()
		swait(10)
		attacks = attacks - 1
		if attacks == 0 then
			fixalljoints()
			lastattack = ""
		end
	end)
end)
addattack(Enum.KeyCode.E, function()
	if attacking then
		return
	end
	if lastattack == "right" then
		return
	else
		lastattack = "right"
	end
	attacking = true
	if attacks <= 0 then
		rs2,ls2,rj2 = replacejoint("Right Shoulder"),replacejoint("Left Shoulder"),replacejoint("RootJoint")
		for i = 0, 2, 0.1 do
		rs2.C1 = rs2.C1:Lerp(CFrame.new(-0.66123569, -0.0759664774, 0, 0.836167634, 0.17217432, 0.520749211, -0.510048807, -0.105023548, 0.853709757, 0.201677814, -0.979451895, 8.81561668e-09), 0.2)
		ls2.C1 = ls2.C1:Lerp(CFrame.new(0.500000119, 0.96661222, 0, 0.768523753, -0.0691948682, -0.636068642, 0.63350606, -0.0570384003, 0.771632493, -0.0896733478, -0.995971203, 3.91974631e-09), 0.2)
		rj2.C1 = rj2.C1:Lerp(CFrame.new(0, 0, 0, -0.557908654, 0.829902351, 0, 0, 0, 1, 0.829902351, 0.557908654, 0), 0.2)
		swait()
		end
	end
	attacks = attacks + 1
	local hits = {}
	local p = Instance.new("Part")
	p.Anchored = false
	p.CanCollide = false
	p.Transparency = 1
	p.Size = Vector3.new(1.5,2.5,1.5)
	p.CFrame = char["Right Arm"].CFrame
	p.Parent = workspace
	p.Touched:connect(function(hit)
		local ok = true
		for i,v in pairs(hits) do
			if hit.Parent == v then
				ok = false
			end
		end
		if ok and hurt(hit, 15) then
			camshake("left", 0.5, 0.5)
			soundeffect(soundlist.HardHit2, 1, 1, char.Torso)
			table.insert(hits, hit.Parent)
			knockback(hit, rootpart.CFrame.lookVector, 0.5)
			for i = 1, 3 do
				local p = Instance.new("Part")
				p.CanCollide = false
				p.Anchored = true
				p.Material = "Neon"
				p.Size = Vector3.new(0.5,3,0.5)
				p.CFrame = hit.CFrame *randomangle()
				setshape(p, "Sphere")
				p.Parent = char
				spawn(function()
					local endcf = p.CFrame *CFrame.new(0,5,0)
					for i = 1, 50 do
						local cf = p.CFrame
						p.Size = p.Size:Lerp(Vector3.new(0.5,0.5,0.5), 0.1)
						p.CFrame = cf
						p.CFrame = cf:Lerp(endcf, 0.1)
						p.Transparency = i/50
						swait()
					end
					p:Destroy()
				end)
			end
		end
	end)
	stabilizer(p)
	soundeffect(soundlist.Woosh1, 1, 1.2, char.Torso)
	for i = 0, 0.4, 0.1 do
	p.CFrame = char["Right Arm"].CFrame
	p.Stable.Position = p.Position
	rs2.C1 = rs2.C1:Lerp(CFrame.new(-0.300615489, 1.58357882, 0.112298936, -0.591086566, -0.121709943, 0.797372818, -0.797617614, -0.0589888841, -0.600272059, 0.120095201, -0.990811288, -0.0622104593), 0.6)
	ls2.C1 = ls2.C1:Lerp(CFrame.new(0.737226963, 0.512096643, 0, 0.768523753, -0.0691948682, -0.636068642, 0.63350606, -0.0570384003, 0.771632493, -0.0896733478, -0.995971203, 3.91974631e-09), 0.6)
	rj2.C1 = rj2.C1:Lerp(CFrame.new(0, 0, 0, -0.550583005, -0.834780395, 0, 0, 0, 1, -0.834780395, 0.550583005, 0), 0.6)
	swait()
	end
	p:Destroy()
	attacking = false
	spawn(function()
		swait(10)
		attacks = attacks - 1
		if attacks == 0 then
			lastattack = ""
			fixalljoints()
		end
	end)
end)
addattack(Enum.KeyCode.R, function()
	if attacking or attacks ~= 0 then
		return
	end
	local rs,ls,rj = replacejoint("Right Shoulder"),replacejoint("Left Shoulder"),replacejoint("RootJoint")
	attacking = true
	for i = 0, 1.3, 0.1 do
	rs.C1 = rs.C1:Lerp(CFrame.new(-0.496893436, 1.07596898, -0.312988698, 0.19853723, 0.499329865, 0.843357921, 0.169898286, -0.864994049, 0.472143799, 0.965255141, 0.0495468974, -0.256568819), 0.2)
	ls.C1 = ls.C1:Lerp(CFrame.new(0.540391445, 1.0264194, -0.428114742, 0.327020317, -0.479398847, -0.81439209, -0.16517745, -0.877505124, 0.450223595, -0.930469871, -0.0127130449, -0.366147876), 0.2)
	rj.C1 = rj.C1:Lerp(CFrame.new(0, 0, 0, -1, 0, 0, 0, 0.473837465, 0.880612314, 0, 0.880612314, -0.473837465), 0.2)
	swait()
	end
	local hits = {}
	local p = Instance.new("Part")
	p.Anchored = false
	p.CanCollide = false
	p.Transparency = 1
	p.Size = Vector3.new(2.5,2.5,2.5)
	p.CFrame = char["Right Arm"].CFrame *CFrame.new(1,0,0)
	p.Parent = workspace
	p.Touched:connect(function(hit)
		local ok = true
		for i,v in pairs(hits) do
			if hit.Parent == v then
				ok = false
			end
		end
		if ok and hurt(hit, 30) then
			camshake("down", 0.7, 0.5)
			soundeffect(soundlist.HardHit2, 1, 1, char.Torso)
			table.insert(hits, hit.Parent)
			knockback(hit, rootpart.CFrame.lookVector*Vector3.new(0.2,0,0.2)+Vector3.new(0,-1,0), 5)
			for i = 1, 7 do
				local p = Instance.new("Part")
				p.CanCollide = false
				p.Anchored = true
				p.Material = "Neon"
				p.Size = Vector3.new(0.5,3,0.5)
				p.CFrame = hit.CFrame *randomangle()
				setshape(p, "Sphere")
				p.Parent = char
				spawn(function()
					local endcf = p.CFrame *CFrame.new(0,5,0)
					for i = 1, 50 do
						local cf = p.CFrame
						p.Size = p.Size:Lerp(Vector3.new(0.5,0.5,0.5), 0.1)
						p.CFrame = cf
						p.CFrame = cf:Lerp(endcf, 0.1)
						p.Transparency = i/50
						swait()
					end
					p:Destroy()
				end)
			end
		end
	end)
	stabilizer(p)
	soundeffect(soundlist.Woosh2, 1, 1, char.Torso)
	for i = 0, 0.7, 0.1 do
	p.CFrame = char["Right Arm"].CFrame *CFrame.new(1,0,0)
	p.Stable.Position = p.Position
	rs.C1 = rs.C1:Lerp(CFrame.new(-0.667285919, 0.998731434, 0.0985666513, 0.472356766, -0.245664522, 0.846479833, -0.662665009, 0.53425169, 0.52483356, -0.581166148, -0.808841228, 0.0895640329), 0.35)
	ls.C1 = ls.C1:Lerp(CFrame.new(1.08004797, 1.00210166, 0.0862590671, 0.688671947, 0.329867661, -0.64569217, 0.477811068, 0.463347167, 0.746328354, 0.545369148, -0.822494209, 0.161479771), 0.35)
	rj.C1 = rj.C1:Lerp(CFrame.new(0, 0, 0, -1, 0, 0, 0, -0.431734294, 0.902000785, 0, 0.902000785, 0.431734294), 0.35)
	swait()
	end
	p:Destroy()
	swait(10)
	fixalljoints()
	attacking = false
end)
addattack(Enum.KeyCode.Y, function()
	if attacking or attacks ~= 0 then
		return
	end
	attacking = true
	local rs,ls,rj = replacejoint("Right Shoulder"),replacejoint("Left Shoulder"),replacejoint("RootJoint")
	for i = 0, 1.5, 0.1 do
	rs.C1 = rs.C1:Lerp(CFrame.new(-0.5, 0.69189465, 0, -4.37113883e-08, 0, 1, -0.560839891, 0.827924252, -2.45150904e-08, -0.827924252, -0.560839891, -3.61897179e-08), 0.2)
	ls.C1 = ls.C1:Lerp(CFrame.new(0.517904997, 0.547646105, 0.00405242294, 0.0622798949, -0.105018295, -0.992518127, -0.0215675589, 0.994074821, -0.106536403, 0.997825623, 0.0280412138, 0.0596458912), 0.2)
	rh.C1 = rh.C1:Lerp(CFrame.new(0.5, 1, 0, -4.37113883e-08, 0, 1, 0, 1, 0, -1, 0, -4.37113883e-08), 0.2)
	lh.C1 = lh.C1:Lerp(CFrame.new(-0.5, 1, 0, -4.37113883e-08, 0, -1, 0, 1, 0, 1, 0, -4.37113883e-08), 0.2)
	neck.C1 = neck.C1:Lerp(CFrame.new(0, -0.5, 0, -1, 0, 0, 0, 0, 1, 0, 1, 0), 0.2)
	rj.C1 = rj.C1:Lerp(CFrame.new(0, 0, 0, -1, 0, 0, 0, -0.301361054, 0.953510106, 0, 0.953510106, 0.301361054), 0.2)
	swait()
	end
	local lastws = humanoid.WalkSpeed
	humanoid.WalkSpeed = 0
	rootpart.Velocity = Vector3.new(0,70,0)+rootpart.CFrame.lookVector
	local hits = {}
	local p = Instance.new("Part")
	p.Anchored = false
	p.CanCollide = false
	p.Transparency = 1
	p.Size = Vector3.new(2.5,2.5,2.5)
	p.CFrame = char["Right Arm"].CFrame
	p.Parent = workspace
	p.Touched:connect(function(hit)
		local ok = true
		for i,v in pairs(hits) do
			if hit.Parent == v then
				ok = false
			end
		end
		if ok and hurt(hit, 35) then
			camshake("up", 0.7, 0.5)
			soundeffect(soundlist.HardHit3, 1, 1, char.Torso)
			table.insert(hits, hit.Parent)
			knockback(hit, rootpart.CFrame.lookVector*Vector3.new(0.2,0,0.2)+Vector3.new(0,1,0), 6)
			for i = 1, 7 do
				local p = Instance.new("Part")
				p.CanCollide = false
				p.Anchored = true
				p.Material = "Neon"
				p.Size = Vector3.new(0.5,3,0.5)
				p.CFrame = hit.CFrame *randomangle()
				setshape(p, "Sphere")
				p.Parent = char
				spawn(function()
					local endcf = p.CFrame *CFrame.new(0,5,0)
					for i = 1, 50 do
						local cf = p.CFrame
						p.Size = p.Size:Lerp(Vector3.new(0.5,0.5,0.5), 0.1)
						p.CFrame = cf
						p.CFrame = cf:Lerp(endcf, 0.1)
						p.Transparency = i/50
						swait()
					end
					p:Destroy()
				end)
			end
		end
	end)
	stabilizer(p)
	soundeffect(soundlist.Woosh2, 1, 0.9, char.Torso)
	local rh,lh,neck = replacejoint("Right Hip"),replacejoint("Left Hip"),replacejoint("Neck")
	for i = 0, 2, 0.1 do
	p.CFrame = char["Right Arm"].CFrame
	p.Stable.Position = p.Position
	rs.C1 = rs.C1:Lerp(CFrame.new(-0.5, 0.446216494, -0.361232638, -4.37113847e-08, 0, 0.99999994, -0.360836178, -0.932629287, -1.57726507e-08, 0.932629287, -0.360836178, 4.07665226e-08), 0.35)
	ls.C1 = ls.C1:Lerp(CFrame.new(0.517904997, 0.547646105, 0.00405242294, 0.0622798949, -0.105018295, -0.992518127, -0.0215675589, 0.994074821, -0.106536403, 0.997825623, 0.0280412138, 0.0596458912), 0.35)
	rh.C1 = rh.C1:Lerp(CFrame.new(0.5, 1, 0, -4.37113883e-08, 0, 1, 0.835349202, 0.549719632, 3.65142725e-08, -0.549719632, 0.835349202, -2.40290081e-08), 0.35)
	lh.C1 = lh.C1:Lerp(CFrame.new(-0.5, 1, 5.96046448e-08, -4.37113883e-08, 0, -1, 0.934595525, 0.355712235, -4.08524663e-08, 0.355712235, -0.934595525, -1.55486752e-08), 0.35)
	neck.C1 = neck.C1:Lerp(CFrame.new(0, -0.5, 0, -1, 0, 0, 0, 0.0765283406, 0.997067392, 0, 0.997067392, -0.0765283406), 0.35)
	rj.C1 = rj.C1:Lerp(CFrame.new(0, -0.439764589, 0.236440629, -1, 0, 0, 0, 0.186102957, 0.982530236, 0, 0.982530236, -0.186102957), 0.35)
	swait()
	end
	fixalljoints()
	attacking = false
	humanoid.WalkSpeed = lastws
	swait(20)
end)
addattack(Enum.KeyCode.F, function()
	if attacking or attacks ~= 0 then
		return
	end
	local rs,ls,rj = replacejoint("Right Shoulder"),replacejoint("Left Shoulder"),replacejoint("RootJoint")
	attacking = true
	for i = 0, 1.3, 0.1 do
	rs.C1 = rs.C1:Lerp(CFrame.new(-0.49999994, -0.365668952, 0, 0.801226735, -0.011569812, 0.598249018, -0.598186672, 0.00863788743, 0.801310301, -0.0144386161, -0.999895751, -6.3113198e-10), 0.35)
	ls.C1 = ls.C1:Lerp(CFrame.new(0.5, 0.5, 0, 0.810985923, -0.159224555, -0.562982619, 0.552435875, -0.108462237, 0.826468766, -0.192656472, -0.98126626, 8.42128145e-09), 0.35)
	rj.C1 = rj.C1:Lerp(CFrame.new(0, 0, 0, -0.553187609, 0.833056748, 0, 0.426593065, 0.283277214, 0.858936787, 0.715543091, 0.475153178, -0.512081623), 0.35)
	swait()
	end
	local hits = {}
	local p = Instance.new("Part")
	p.Anchored = false
	p.CanCollide = false
	p.Transparency = 1
	p.Size = Vector3.new(2.5,2.5,2.5)
	p.CFrame = char["Right Arm"].CFrame
	p.Parent = workspace
	p.Touched:connect(function(hit)
		local ok = true
		for i,v in pairs(hits) do
			if hit.Parent == v then
				ok = false
			end
		end
		if ok and hurt(hit, 45) then
			camshake("left", 0.7, 0.8)
			soundeffect(soundlist.HardHit3, 1, 1, char.Torso)
			table.insert(hits, hit.Parent)
			knockback(hit, rootpart.CFrame.lookVector, 5)
			for i = 1, 7 do
				local p = Instance.new("Part")
				p.CanCollide = false
				p.Anchored = true
				p.Material = "Neon"
				p.Size = Vector3.new(0.5,3,0.5)
				p.CFrame = hit.CFrame *randomangle()
				setshape(p, "Sphere")
				p.Parent = char
				spawn(function()
					local endcf = p.CFrame *CFrame.new(0,5,0)
					for i = 1, 50 do
						local cf = p.CFrame
						p.Size = p.Size:Lerp(Vector3.new(0.5,0.5,0.5), 0.1)
						p.CFrame = cf
						p.CFrame = cf:Lerp(endcf, 0.1)
						p.Transparency = i/50
						swait()
					end
					p:Destroy()
				end)
			end
		end
	end)
	stabilizer(p)
	soundeffect(soundlist.Woosh2, 1, 1, char.Torso)
	for i = 0, 0.7, 0.1 do
	p.CFrame = char["Right Arm"].CFrame
	p.Stable.Position = p.Position
	rs.C1 = rs.C1:Lerp(CFrame.new(-0.0815927088, 1.02625275, -0.263894349, -0.186050832, 0.00268659508, 0.982536495, -0.884674728, -0.435528874, -0.166329011, 0.427476168, -0.900170743, 0.083407253), 0.35)
	ls.C1 = ls.C1:Lerp(CFrame.new(0.594317198, 0.0587400198, -0.128876805, 0.168223724, -0.0330281407, -0.985195339, 0.966738999, -0.189804256, 0.171435371, -0.192656472, -0.98126626, 8.42128145e-09), 0.35)
	rj.C1 = rj.C1:Lerp(CFrame.new(0, 0, 0.227821022, -0.806821465, -0.590735316, -0.00842596591, 0.292753816, -0.412147343, 0.862803519, -0.513161182, 0.693661571, 0.505469382), 0.35)
	swait()
	end
	p:Destroy()
	swait(10)
	fixalljoints()
	attacking = false
end)

if settings.CustomAnim then
	if char:FindFirstChild("Animate") then
		char.Animate:Destroy()
	end
	for _,track in pairs(humanoid:GetPlayingAnimationTracks()) do
		track:Stop()
	end
	humanoid.Running:connect(function(ws)
		movespeed = ws
	end)
end
local function landing()
	if animpose == "Fall" then
		local hit,pos = workspace:FindPartOnRay(Ray.new(rootpart.Position, Vector3.new(0,-1,0).unit * 4.1), char)
		local p = Instance.new("Part")
		p.Anchored = true
		p.CanCollide = false
		p.Material = "Neon"
		p.Size = Vector3.new(0.1,0.1,0.1)
		p.CFrame = CFrame.new(pos)
		setshape(p, "Sphere")
		p.Parent = char
		spawn(function()
			for i = 1, 50 do
				local cf = p.CFrame
				p.Size = p.Size:Lerp(Vector3.new(10,0.2,10), 0.1)
				p.CFrame = cf
				p.Transparency = i/50
				swait()
			end
			p:Destroy()
		end)
	end
end
spawn(function()
local foot = "left"
local rate = 0
repeat swait()
	if timestate == "Slow" then
		local ws = humanoid.WalkSpeed
		rootpart.Velocity = Vector3.new(humanoid.MoveDirection.X*ws,rootpart.Velocity.Y,humanoid.MoveDirection.Z*ws)
		if not rootpart:FindFirstChild("Gravity") then
			local force = Instance.new("BodyForce")
			force.Name = "Gravity"
			force.Force = Vector3.new(0,-196.2*playermass*10,0)
			force.Parent = rootpart
		end
		if rate%2 == 0 then
			local model = char:FindFirstChild("FakeModel") or Instance.new("Model")
			model.Name = "FakeModel"
			model.Parent = char
			for _,v in pairs(char:GetChildren()) do
				local ok = false
				for _,nm in pairs({"Head", "Torso", "Right Arm", "Left Arm", "Right Leg", "Left Leg"}) do
					if v.Name == nm then
						ok = true
					end
				end
				if v:IsA("BasePart") and v.Transparency < 1 and ok and v.Name ~= "effect" then
					local v = v
					if v:IsA("Accessory") then
						v = v:FindFirstChild("Handle")
					end
					local new = v:Clone()
					new.Size = new.Size-Vector3.new(0.1,0.1,0.1)
					new.CFrame = v.CFrame *CFrame.new(math.random(-5,5)/100,math.random(-5,5)/100,math.random(-5,5)/100)
					new.CanCollide = false
					for _,face in pairs({"Front", "Back", "Top", "Bottom", "Left", "Right"}) do
						new[face.."Surface"] = "SmoothNoOutlines"
					end
					new.Anchored = true
					for _,e in pairs(new:GetChildren()) do
						e:Destroy()
					end
					new.Parent = model
					for _,e in pairs(v:GetDescendants()) do
						if e:IsA("SpecialMesh") or e:IsA("Decal") and e.Transparency < 1 then
							e:Clone().Parent = new
						end
					end
					spawn(function()
						for i = 1, 15 do
							new.Transparency = i/15
							if new:FindFirstChildOfClass("Decal") then
								new:FindFirstChildOfClass("Decal").Transparency = i/15
							end
							swait()
						end
						new:Destroy()
					end)
				end
			end
		end
	else
		if rootpart:FindFirstChild("Gravity") then
			rootpart.Gravity:Destroy()
		end
		if char:FindFirstChild("FakeModel") then
			char.FakeModel:Destroy()
		end
	end
	rate = rate + 1
	local wall = workspace:FindPartOnRay(Ray.new(rootpart.Position, Vector3.new(0,0,-1).unit * 4), char) == nil
	local air = workspace:FindPartOnRay(Ray.new(rootpart.Position, Vector3.new(0,-1,0).unit * 4), char) == nil
	local tvel = rootpart.Velocity
	if air and tvel.Y > 0 then
		animpose = "Jump"
	end
	if air and tvel.Y < 0 then
		animpose = "Fall"
	end
	if not air and (math.abs(humanoid.MoveDirection.X)+math.abs(humanoid.MoveDirection.Z))>0 then
		landing()
		animpose = "Walking"
	end
	if not air and animpose == "Walking" and humanoid.WalkSpeed >= 20 then
		landing()
		animpose = "Running"--or Running
	end
	if not air and movespeed == 0 then
		landing()
		animpose = "Idle"
	end
	if animpose == "Idle" and rate%35 == 0 then
		local left,pos1 = workspace:FindPartOnRay(Ray.new((char["Left Leg"].CFrame*CFrame.new(0,0,0)).p, Vector3.new(0,-1,0).unit * 1.1), char)
		local right,pos2 = workspace:FindPartOnRay(Ray.new((char["Right Leg"].CFrame*CFrame.new(0,0,0)).p, Vector3.new(0,-1,0).unit * 1.1), char)
		for i,v in pairs({"Right Leg", "Left Leg"}) do
			local bodypart = char[v]
			local p = Instance.new("Part")
			p.Anchored = true
			p.CanCollide = false
			p.Material = "Neon"
			p.Size = Vector3.new(0.1,0.1,0.1)
			p.CFrame = CFrame.new(v == "Left Leg" and pos1 or pos2)
			setshape(p, "Sphere")
			p.Parent = char
			spawn(function()
				for i = 1, 50 do
					local cf = p.CFrame
					p.Size = p.Size:Lerp(Vector3.new(5,0.2,5), 0.1)
					p.CFrame = cf
					p.Transparency = i/50
					swait()
				end
				p:Destroy()
			end)
		end
	end
	if animpose == "Walking" or animpose == "Running" then
		local left,pos1 = workspace:FindPartOnRay(Ray.new((char["Left Leg"].CFrame*CFrame.new(0,-0.95,0)).p, Vector3.new(0,-1,0).unit * 0.2), char)
		local right,pos2 = workspace:FindPartOnRay(Ray.new((char["Right Leg"].CFrame*CFrame.new(0,-0.95,0)).p, Vector3.new(0,-1,0).unit * 0.2), char)
		if left and foot == "right" then
			foot = "left"
			local p = Instance.new("Part")
			p.Anchored = true
			p.CanCollide = false
			p.Material = "Neon"
			p.Size = Vector3.new(0.2,0.2,0.2)
			p.CFrame = CFrame.new(pos1)
			setshape(p, "Sphere")
			p.Parent = char
			spawn(function()
				for i = 1, 50 do
					local cf = p.CFrame
					p.Size = p.Size:Lerp(Vector3.new(20,0.2,20), 0.1)
					p.CFrame = cf
					p.Transparency = i/50
					swait()
				end
				p:Destroy()
			end)
		end
		if right and foot == "left" then
			foot = "right"
			local p = Instance.new("Part")
			p.Anchored = true
			p.CanCollide = false
			p.Material = "Neon"
			p.Size = Vector3.new(0.2,0.2,0.2)
			p.CFrame = CFrame.new(pos2)
			setshape(p, "Sphere")
			p.Parent = char
			spawn(function()
				for i = 1, 50 do
					local cf = p.CFrame
					p.Size = p.Size:Lerp(Vector3.new(20,0.2,20), 0.1)
					p.CFrame = cf
					p.Transparency = i/50
					swait()
				end
				p:Destroy()
			end)
		end
	end 
until not settings.CustomAnim
end)
local change = 5
local cos,rad,ang,cf = math.cos,math.rad,CFrame.Angles,CFrame.new
while swait() and settings.CustomAnim do
	local num = tick()*change
	if animpose == "Walking" and cananim then
		change = (humanoid.WalkSpeed/16)*9
		ls.C1 = ls.C1:Lerp(CFrame.new(0.5, 0.5, 0, -4.37113883e-08, 0, -1, 0, 1, 0, 1, 0, -4.37113883e-08)*cf(cos(num * 1 + 0) * 0 + 0, cos(num * 1 + 0) *0 + 0, cos(num * 1 + 0) * 0 + 0) *ang(math.rad(cos(num * 1 + 0) * 0 + 0), math.rad(cos(num * 1 + 0) * 0 + 0), math.rad(cos(num * 1 + 0.2) * -45 + 0)), 0.35)
		rj.C1 = rj.C1:Lerp(CFrame.new(0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 1, 0)*cf(cos(num * 1 + 0) * 0 + 0, cos(num * 1 + 0) *0 + 0, cos(num * 2 + -1) * 0.10000000149012 + 0.10000000149012) *ang(math.rad(cos(num * 2 + 0) * 3 + -10), math.rad(cos(num * 1 + 0) * 0 + 0), math.rad(cos(num * 1 + -1) * 5 + 0)), 0.35)
		lh.C1 = lh.C1:Lerp(CFrame.new(-0.5, 1, 0, -4.37113883e-08, 0, -1, 0, 1, 0, 1, 0, -4.37113883e-08)*cf(cos(num * 1 + 0) * 0 + 0, cos(num * 1 + -1) *0.10000000149012 + 0, cos(num * 1 + 0) * 0 + 0) *ang(math.rad(cos(num * 1 + 0) * 0 + 0), math.rad(cos(num * 1 + 0) * 5 + 0), math.rad(cos(num * 1 + 0) * 55 + -15)), 0.35)
		neck.C1 = neck.C1:Lerp(CFrame.new(0, -0.5, 0, -1, 0, 0, 0, 0, 1, 0, 1, 0)*cf(cos(num * 1 + 0) * 0 + 0, cos(num * 1 + 0) *0 + 0, cos(num * 1 + 0) * 0 + 0) *ang(math.rad(cos(num * 1 + 1) * 2 + -5), math.rad(cos(num * 1 + 0) * 0 + 0), math.rad(cos(num * 1 + 0) * 0 + 0)), 0.35)
		rh.C1 = rh.C1:Lerp(CFrame.new(0.5, 1, 0, -4.37113883e-08, 0, 1, 0, 1, 0, -1, 0, -4.37113883e-08)*cf(cos(num * 1 + 0) * 0 + 0, cos(num * 1 + 1) *0.10000000149012 + 0, cos(num * 1 + 0) * 0 + 0) *ang(math.rad(cos(num * 1 + 0) * 0 + 0), math.rad(cos(num * 1 + 0) * -5 + 0), math.rad(cos(num * 1 + 0) * 55 + 15)), 0.35)
		rs.C1 = rs.C1:Lerp(CFrame.new(-0.5, 0.5, 0, -4.37113883e-08, 0, 1, 0, 1, 0, -1, 0, -4.37113883e-08)*cf(cos(num * 1 + 0) * 0 + 0, cos(num * 1 + 0) *0 + 0, cos(num * 1 + 0) * 0 + 0) *ang(math.rad(cos(num * 1 + 0) * 0 + 0), math.rad(cos(num * 1 + 0) * 0 + 0), math.rad(cos(num * 1 + 0.2) * -45 + 0)), 0.35)
	end
	if animpose == "Running" and cananim then
		change = (humanoid.WalkSpeed/24)*10
		ls.C1 = ls.C1:Lerp(CFrame.new(0.5, 0.5, 0, -4.37113883e-08, 0, -1, 0, 1, 0, 1, 0, -4.37113883e-08)*cf(cos(num * 1 + 0) * 0 + 0, cos(num * 1 + 0) *0 + 0, cos(num * 1 + 0) * 0 + 0) *ang(math.rad(cos(num * 1 + 0) * 0 + 0), math.rad(cos(num * 1 + 0) * 0 + 0), math.rad(cos(num * 1 + 0.2) * -60 + 0)), 0.35)
		rj.C1 = rj.C1:Lerp(CFrame.new(0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 1, 0)*cf(cos(num * 1 + 0) * 0 + 0, cos(num * 1 + 0) *0 + 0, cos(num * 2 + -1) * 0.10000000149012 + 0.10000000149012) *ang(math.rad(cos(num * 2 + 0) * 3 + -20), math.rad(cos(num * 1 + 0) * 0 + 0), math.rad(cos(num * 1 + -1) * 5 + 0)), 0.35)
		lh.C1 = lh.C1:Lerp(CFrame.new(-0.5, 1, 0, -4.37113883e-08, 0, -1, 0, 1, 0, 1, 0, -4.37113883e-08)*cf(cos(num * 1 + 0) * 0 + 0, cos(num * 1 + -1) *0.10000000149012 + 0, cos(num * 1 + 0) * 0 + 0) *ang(math.rad(cos(num * 1 + 0) * 0 + 0), math.rad(cos(num * 1 + 0) * 5 + 0), math.rad(cos(num * 1 + 0) * 65 + -10)), 0.35)
		neck.C1 = neck.C1:Lerp(CFrame.new(0, -0.5, 0, -1, 0, 0, 0, 0, 1, 0, 1, 0)*cf(cos(num * 1 + 0) * 0 + 0, cos(num * 1 + 0) *0 + 0, cos(num * 1 + 0) * 0 + 0) *ang(math.rad(cos(num * 1 + 1) * 2 + -5), math.rad(cos(num * 1 + 0) * 0 + 0), math.rad(cos(num * 1 + 0) * 0 + 0)), 0.35)
		rh.C1 = rh.C1:Lerp(CFrame.new(0.5, 1, 0, -4.37113883e-08, 0, 1, 0, 1, 0, -1, 0, -4.37113883e-08)*cf(cos(num * 1 + 0) * 0 + 0, cos(num * 1 + 1) *0.10000000149012 + 0, cos(num * 1 + 0) * 0 + 0) *ang(math.rad(cos(num * 1 + 0) * 0 + 0), math.rad(cos(num * 1 + 0) * -5 + 0), math.rad(cos(num * 1 + 0) * 65 + 10)), 0.35)
		rs.C1 = rs.C1:Lerp(CFrame.new(-0.5, 0.5, 0, -4.37113883e-08, 0, 1, 0, 1, 0, -1, 0, -4.37113883e-08)*cf(cos(num * 1 + 0) * 0 + 0, cos(num * 1 + 0) *0 + 0, cos(num * 1 + 0) * 0 + 0) *ang(math.rad(cos(num * 1 + 0) * 0 + 0), math.rad(cos(num * 1 + 0) * 0 + 0), math.rad(cos(num * 1 + 0.2) * -60 + 0)), 0.35)
	end
	if animpose == "Fall" and cananim then
		rs.C1 = rs.C1:Lerp(CFrame.new(-0.5, 0.499999911, -2.98023224e-08, -4.37113847e-08, 0, 0.99999994, -0.848737478, 0.528814375, -3.70994933e-08, -0.528814375, -0.848737478, -2.31152111e-08), 0.03)
		ls.C1 = ls.C1:Lerp(CFrame.new(0.5, 0.5, 2.98023224e-08, -4.37113883e-08, 0, -1, 0.751466334, 0.659771562, -3.28476375e-08, 0.659771562, -0.751466334, -2.88395317e-08), 0.03)
		rh.C1 = rh.C1:Lerp(CFrame.new(0.5, 1, 0, -4.37113883e-08, 0, 1, 0.9062047, 0.422839224, 3.96114643e-08, -0.422839224, 0.9062047, -1.84828899e-08), 0.03)
		lh.C1 = lh.C1:Lerp(CFrame.new(-0.5, 1, -2.98023224e-08, -4.37113883e-08, 0, -1, 0.321224481, 0.947003067, -1.40411682e-08, 0.947003067, -0.321224481, -4.139482e-08), 0.03)
		neck.C1 = neck.C1:Lerp(CFrame.new(0, -0.5, 0, -1, 0, 0, 0, -0.385730505, 0.922611475, 0, 0.922611475, 0.385730505), 0.03)
		rj.C1 = rj.C1:Lerp(CFrame.new(0, 0.394207865, -0.0643720552, -1, 0, 0, 0, -0.191213459, 0.981548548, 0, 0.981548548, 0.191213459), 0.03)
	end
	if animpose == "Idle" and cananim then
		change = 3
		ls.C1 = ls.C1:Lerp(CFrame.new(0.5, 0.5, 0, -4.37113883e-08, 0, -1, 0, 1, 0, 1, 0, -4.37113883e-08)*cf(cos(num * 1 + 0) * 0 + 0, cos(num * 1 + 1) *0.050000000745058 + 0.10000000149012, cos(num * 1 + 0) * 0 + 0) *ang(math.rad(cos(num * 1 + 0) * 2 + 5), math.rad(cos(num * 0.5 + 0) * -5 + -5), math.rad(cos(num * 1 + 0) * 0 + 0)), 0.35)
		rj.C1 = rj.C1:Lerp(CFrame.new(0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 1, 0)*cf(cos(num * 1 + 0) * 0 + 0, cos(num * 1 + 0) *0 + 0, cos(num * 1 + 0) * 0.10000000149012 + 0.20000000298023) *ang(math.rad(cos(num * 1 + 0) * 1 + 0), math.rad(cos(num * 1 + 0) * 0 + 0), math.rad(cos(num * 1 + 0) * 0 + 10)), 0.35)
		lh.C1 = lh.C1:Lerp(CFrame.new(-0.5, 1, 0, -4.37113883e-08, 0, -1, 0, 1, 0, 1, 0, -4.37113883e-08)*cf(cos(num * 1 + 0) * 0 + 0, cos(num * 1 + 0) *-0.10100000351667 + 0, cos(num * 1 + 0) * 0 + 0) *ang(math.rad(cos(num * 1 + 0) * 0 + 2), math.rad(cos(num * 1 + 0) * 0 + -5), math.rad(cos(num * 1 + 0) * -2 + -2)), 0.35)
		neck.C1 = neck.C1:Lerp(CFrame.new(0, -0.5, 0, -1, 0, 0, 0, 0, 1, 0, 1, 0)*cf(cos(num * 1 + 0) * 0 + 0, cos(num * 1 + 0) *0 + 0, cos(num * 1 + 0) * 0 + 0) *ang(math.rad(cos(num * 1 + 1) * 2 + -3), math.rad(cos(num * 1 + 0) * 0 + 0), math.rad(cos(num * 1 + 0) * 0 + -5)), 0.35)
		rh.C1 = rh.C1:Lerp(CFrame.new(0.5, 1, 0, -4.37113883e-08, 0, 1, 0, 1, 0, -1, 0, -4.37113883e-08)*cf(cos(num * 1 + 0) * 0 + -0.10100000351667, cos(num * 1 + 0) *-0.10100000351667 + -0.10199999809265, cos(num * 1 + 0) * 0 + 0) *ang(math.rad(cos(num * 1 + 0) * 0 + 2), math.rad(cos(num * 1 + 0) * 0 + 5), math.rad(cos(num * 1 + 0) * 2 + 0)), 0.35)
		rs.C1 = rs.C1:Lerp(CFrame.new(-0.5, 0.5, 0, -4.37113883e-08, 0, 1, 0, 1, 0, -1, 0, -4.37113883e-08)*cf(cos(num * 1 + 0) * 0 + 0, cos(num * 1 + 1) *0.050000000745058 + 0.10000000149012, cos(num * 1 + 0) * 0 + 0) *ang(math.rad(cos(num * 1 + 0) * 2 + 5), math.rad(cos(num * 0.5 + 0) * 5 + 5), math.rad(cos(num * 1 + 0) * 0 + 0)), 0.35)
	end
	if animpose == "Jump" and cananim then
		rs.C1 = rs.C1:Lerp(CFrame.new(-0.5, 0.5, 0, -4.37113883e-08, 0, 1, -0.665773153, -0.746154189, -2.91018694e-08, 0.746154189, -0.665773153, 3.26154357e-08), 0.25)
		ls.C1 = ls.C1:Lerp(CFrame.new(0.5, 0.5, 0, -4.37113883e-08, 0, -1, 0.757894218, -0.652377486, -3.31286074e-08, -0.652377486, -0.757894218, 2.85163253e-08), 0.25)
		rh.C1 = rh.C1:Lerp(CFrame.new(0.5, 1, 0, -4.37113883e-08, 0, 1, 0.751373947, 0.659876645, 3.28435981e-08, -0.659876645, 0.751373947, -2.88441235e-08), 0.25)
		lh.C1 = lh.C1:Lerp(CFrame.new(-0.5, 1, 0, -4.37113883e-08, 0, -1, 0.429746985, 0.902949333, -1.87848368e-08, 0.902949333, -0.429746985, -3.94691675e-08), 0.25)
		neck.C1 = neck.C1:Lerp(CFrame.new(0, -0.5, 0, -1, 0, 0, 0, -0.201922834, 0.97940141, 0, 0.97940141, 0.201922834), 0.25)
		rj.C1 = rj.C1:Lerp(CFrame.new(0, -0.318411648, 0.10930454, -1, 0, 0, 0, 0.324682653, 0.945823014, 0, 0.945823014, -0.324682653), 0.25)
	end
end
