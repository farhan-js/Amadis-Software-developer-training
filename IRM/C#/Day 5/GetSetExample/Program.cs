using System;

public class Student
{
    private int _age;

    public int Age
    {
        get
        {
            return _age;
        }

        set
        {
            if (value >= 18)
            {
                _age = value;
            }
            else
            {
                Console.WriteLine("Age must be 18 or above.");
            }
        }
    }
}

class Program
{
    static void Main()
    {
        Student student = new Student();

        student.Age = 21;
        Console.WriteLine("Age: " + student.Age);

        student.Age = 15;
        Console.WriteLine("Age: " + student.Age);

        student.Age = 25;
        Console.WriteLine("Age: " + student.Age);
    }
}