using System;

class Looping
{
    static void Main(string[] args)
    {
        // 1. FOR LOOP
        Console.WriteLine("FOR LOOP");

        for (int i = 1; i <= 5; i++)
        {
            Console.WriteLine(i);
        }


        // 2. WHILE LOOP
        Console.WriteLine("\nWHILE LOOP");

        int count = 1;

        while (count <= 5)
        {
            Console.WriteLine(count);
            count++;
        }


        // 3. DO-WHILE LOOP
        Console.WriteLine("\nDO-WHILE LOOP");

        int number = 1;

        do
        {
            Console.WriteLine(number);
            number++;
        }
        while (number <= 5);


        // 4. FOREACH LOOP
        Console.WriteLine("\nFOREACH LOOP");

        string[] names = { "Farhan", "Ahmed", "John" };

        foreach (string name in names)
        {
            Console.WriteLine(name);
        }


        // 5. BREAK
        Console.WriteLine("\nBREAK");

        for (int i = 1; i <= 10; i++)
        {
            if (i == 5)
            {
                break;
            }

            Console.WriteLine(i);
        }


        // 6. CONTINUE
        Console.WriteLine("\nCONTINUE");

        for (int i = 1; i <= 5; i++)
        {
            if (i == 3)
            {
                continue;
            }

            Console.WriteLine(i);
        }
    }
}