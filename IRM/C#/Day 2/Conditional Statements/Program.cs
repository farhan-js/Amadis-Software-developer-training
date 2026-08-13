using System;
class Conditional
{
    static void Main(String[] args)
    {
        Console.WriteLine("Enter your age");
        int age =int.Parse(Console.ReadLine());

        if (age >= 18)
        {
            Console.WriteLine("Eligible to Vote");
        }

        Console.WriteLine("Enter a number:");
        int num=int.Parse(Console.ReadLine()!);
        if (num > 0)
        {
            Console.WriteLine("Positive number");
        }
        else if (num < 0)
        {
            Console.WriteLine("Negative number");
        }
        else
        {
            Console.WriteLine("Number is Zero");
        }
        Console.WriteLine("Enter a number for month");
        int month= int.Parse(Console.ReadLine()!);
        switch (month){
            case 1:
                Console.WriteLine("January");
                break;
            case 2:
                Console.WriteLine("February");
                break;
            
            case 3:
                Console.WriteLine("March");
                break;
            
            case 4:
                Console.WriteLine("April");
                break;
            
            case 5:
                Console.WriteLine("May");
                break;
            
            case 6:
                Console.WriteLine("June");
                break;
            
            case 7:
                Console.WriteLine("July");
                break;
            
            case 8:
                Console.WriteLine("August");
                break;
            
            case 9:
                Console.WriteLine("September");
                break;
            case 10:
                Console.WriteLine("October");
                break;
            case 11:
                Console.WriteLine("November");
                break;
            case 12:
                Console.WriteLine("December");
                break;
            default:
                Console.WriteLine("Enter a valid Input");
                break;
            

        }
    }
}
