using System;

namespace MethodOverloadingExample
{
    class MethodOverloadingExample
    {
        public int Add(int a, int b)
        {
            return a + b;
        }

        public int Add(int a, int b, int c)
        {
            return a + b + c;
        }

        public double Add(double a, double b)
        {
            return a + b;
        }

        public static void Main(string[] args)
        {
            MethodOverloadingExample obj = new MethodOverloadingExample();

            Console.WriteLine(obj.Add(10, 20));
            Console.WriteLine(obj.Add(10, 20, 30));
            Console.WriteLine(obj.Add(10.5, 20.5));
        }
    }
}