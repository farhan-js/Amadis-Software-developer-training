using System;

namespace MyFirstApp
{
    class Program
    {
        static void Main(string[] args)
        {
            int a = 10;
            int b = 5;
            
            Console.WriteLine($"Addition: {a + b}");
            Console.WriteLine($"Subtraction: {a - b}");
            Console.WriteLine($"Multiplication: {a * b}");
            Console.WriteLine($"Division: {a / b}");
            Console.WriteLine($"Modulus: {a % b}");
        }
    }
}