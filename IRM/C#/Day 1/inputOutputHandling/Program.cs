using System;

namespace MyFirstApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Enter your name: ");
            string name = Console.ReadLine()!;

            Console.Write("Enter your age: ");
            int age = int.Parse(Console.ReadLine()!);

            Console.WriteLine($"Name: {name}");
            Console.WriteLine($"Age: {age}");
        }
    }
}