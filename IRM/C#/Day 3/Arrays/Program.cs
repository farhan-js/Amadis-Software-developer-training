using System;
using System.Numerics;
namespace ArraysExample;

class ArraysExample
{
    public static void Main(String[] args)
    {
        // int[] numbers=new int[5];
        // int[] newNumbers=new int[];

        // Console.WriteLine("Enter your array Elements:");

        // for (int i = 0; i < 5; i++)
        // {
        //     numbers[i]=int.Parse(Console.ReadLine()!);

        // }
        // Console.WriteLine("Arrays Elements");
        // foreach(int i in numbers)
        // {
        //     Console.WriteLine(i);
        // }

        // int[] arr={1,2,3,4,5};
        // Console.WriteLine(arr);

        // int[] arr=new int[5];
        // Console.WriteLine(arr[4]);

        // String[] arr=new String[5];
        // Console.WriteLine(arr[4]);

        bool[] arr = new bool[5];
        Console.WriteLine(arr[4]);

        int[,] matrix = new int[3, 2];

        foreach (int i in matrix)
        {
            Console.WriteLine(i);
        }
        int[,,] arr1 = new int[2, 3, 4];

        int[,,] arr2 ={
            {
        { 1, 2, 3 },
        { 4, 5, 6 }
        },
        {
        { 7, 8, 9 },
        { 10, 11, 12 }
            }
        };


        Console.WriteLine(arr2[0, 0, 0]);

        for (int i = 0; i < arr.GetLength(0); i++)
        {
            for (int j = 0; j < arr.GetLength(1); j++)
            {
                Console.Write(arr[i, j] + " ");
            }

            Console.WriteLine();
        }

        for (int i = 0; i < arr2.GetLength(0); i++)
        {
            for (int j = 0; j < arr2.GetLength(1); j++)
            {
                for (int k = 0; k < arr2.GetLength(2); k++)
                {
                    Console.WriteLine(arr2[i, j, k]);
                }
            }
        }
        int[] arr1 = { 10, 20, 30, 40, 50 };
        int[] arr2 = new int[5];

        Array.Copy(arr1, arr2, 6);

        foreach (int value in arr2)
        {
            Console.WriteLine(value);
        }


    }
}