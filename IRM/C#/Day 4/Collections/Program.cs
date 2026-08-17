using System;
using System.Numerics;
namespace CollectionsExample;

class CollectionsExample
{
    public static void Main(String[] args)
    {
        List<int> numbers = new List<int>(1);
        numbers.Add(10);
        numbers.Add(20);
        numbers.Add(30);
        Console.WriteLine(String.Join(",", numbers));
        Console.WriteLine(numbers.Capacity);
        numbers.AddRange(30, 40, 50);
        numbers.Add(10);
        Console.WriteLine(String.Join(",", numbers));
        Console.WriteLine(numbers[0]);
        Console.WriteLine(numbers.Count);
        numbers.Remove(20);
        numbers.RemoveAt(0);

        Console.WriteLine(numbers.Contains(20));
        HashSet<int> numbers = new HashSet<int>();

        numbers.Add(10);
        numbers.Add(20);
        numbers.Add(30);
        numbers.Add(10);

        Console.WriteLine("HashSet:");

        foreach (int number in numbers)
        {
            Console.WriteLine(number);
        }

        Console.WriteLine(numbers.Contains(20));

        Console.WriteLine(numbers.Remove(20));

        Console.WriteLine(numbers.Count);

        numbers.Add(40);
        numbers.Add(50);

        Console.WriteLine("After adding:");

        foreach (int number in numbers)
        {
            Console.WriteLine(number);
        }

        numbers.Clear();

        Console.WriteLine(numbers.Count);
        Dictionary<int, string> students = new Dictionary<int, string>();

        students.Add(101, "Farhan");
        students.Add(102, "Arun");
        students.Add(103, "John");

        Console.WriteLine("Students:");

        foreach (KeyValuePair<int, string> student in students)
        {
            Console.WriteLine(student.Key + " : " + student.Value);
        }

        Console.WriteLine(students[101]);

        Console.WriteLine(students.ContainsKey(102));

        Console.WriteLine(students.ContainsValue("John"));

        students[102] = "Rahul";

        Console.WriteLine(students[102]);

        Console.WriteLine(students.Remove(103));

        Console.WriteLine(students.Count);

        foreach (KeyValuePair<int, string> student in students)
        {
            Console.WriteLine(student.Key + " : " + student.Value);
        }

        students.Clear();

        Console.WriteLine(students.Count);


    }
}


