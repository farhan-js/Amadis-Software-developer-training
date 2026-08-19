using System;

public abstract class Appliance
{
    public string Brand;

    public abstract void TurnOn();

    public void DisplayInfo()
    {
        Console.WriteLine($"Appliance Brand: {Brand}");
    }
}

// 2. Child Class 1
public class Microwave : Appliance
{
    // Must use 'override' keyword to provide execution code
    public override void TurnOn()
    {
        Console.WriteLine("Microwave is humming and heating food!");
    }
}

// 3. Child Class 2
public class Refrigerator : Appliance
{
    public override void TurnOn()
    {
        Console.WriteLine("Refrigerator compressor starts cooling!");
    }
}

public class Program
{
    public static void Main()
    {
        // Appliance myApp = new Appliance(); // COMPILE ERROR! Cannot instantiate abstract class

        Appliance myMicrowave = new Microwave();
        myMicrowave.Brand = "LG";
        myMicrowave.DisplayInfo(); // Output: Appliance Brand: LG
        myMicrowave.TurnOn();      // Output: Microwave is humming and heating food!

        Appliance myFridge = new Refrigerator();
        myFridge.Brand = "Samsung";
        myFridge.DisplayInfo();  // Output: Appliance Brand: Samsung
        myFridge.TurnOn();       // Output: Refrigerator compressor starts cooling!
    }
}