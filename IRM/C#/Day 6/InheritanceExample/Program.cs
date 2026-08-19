// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Text.RegularExpressions;
// using System.Text;


// namespace HelloWorld
// {
// 	public class Employee{
// 		public string name;
// 		public int id;
//         public decimal salary;
// 	}
// 	public class Program
// 	{
// 		public static void Main(string[] args)
// 		{
// 			Employee s1=new Employee();
// 			s1.name="Rohan";
// 			Employee s2=s1;
// 			s2.name="Farhan";
// 			s2.name="Aathil";
// 			Console.WriteLine(s1.name);

// // StringBuilder sb = new StringBuilder();
// // sb.Append("Hello");
// // Console.WriteLine(sb);
// // Console.WriteLine(sb[0]);
// 		}
// 	}
// }



using System;

// 1. Base Class (Inheritance & Virtual Method)
public class Animal
{
    public string Name;

    public virtual void MakeSound()
    {
        Console.WriteLine("Animal makes a sound");
    }
}

// 2. Child Class (Inherits using ':' and overrides behavior)
public class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine($"{Name} barks: Woof! Woof!");
    }
}

public class Program
{
    public static void Main()
    {
        // Polymorphism in action: Base reference pointing to Child object
        Animal myDog = new Dog();
        myDog.Name = "Buddy";
        
        // Calls Dog's overridden method at runtime
        myDog.MakeSound(); // Output: Buddy barks: Woof! Woof!
    }
}