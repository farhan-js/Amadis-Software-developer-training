using System;

namespace MyFirstApp
{
    class Program
    {
        static void Main(string[] args)
        {
            // Implicit conversion
            int myInt = 9;
            double myDouble = myInt;

            Console.WriteLine("Implicit Conversion:");
            Console.WriteLine($"int value: {myInt}");
            Console.WriteLine($"double value: {myDouble}");

            // Explicit conversion
            double number = 9.78;
            int convertedNumber = (int)number;

            Console.WriteLine("\nExplicit Conversion:");
            Console.WriteLine($"double value: {number}");
            Console.WriteLine($"int value: {convertedNumber}");
        }
    }
}