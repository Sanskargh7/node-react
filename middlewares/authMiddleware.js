import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
//traping rain water problem
/*public static int trapingWater(int[] arr,int n){
  int res=0;
  for(int i=1;i<n-1;i++){
    int left=arr[i];
    for(int j=0;j<i;j++){
      left=Math.max(left,arr[j]);
    }
    int right=arr[i];
    for(int j=i+1;j<n;j++){
      right=Math.max(right,arr[j]);
    }
  res+=Math.min(left,right)-arr[i];
  }
  return res;
}
//optimized aproach
// Java implementation of the approach
import java.util.*;

class GFG {

	static int maxWater(int[] arr, int n)
	{

		// Indices to traverse the array
		int left = 0;
		int right = n - 1;

		// To store Left max and right max
		// for two pointers left and right
		int l_max = 0;
		int r_max = 0;

		// To store the total amount
		// of rain water trapped
		int result = 0;
		while (left <= right) {

			// We need check for minimum of left
			// and right max for each element
			if (r_max <= l_max) {

				// Add the difference between
				// current value and right max at index r
				result += Math.max(0, r_max - arr[right]);

				// Update right max
				r_max = Math.max(r_max, arr[right]);

				// Update right pointer
				right -= 1;
			}
			else {
				
				// Add the difference between
				// current value and left max at index l
				result += Math.max(0, l_max - arr[left]);

				// Update left max
				l_max = Math.max(l_max, arr[left]);

				// Update left pointer
				left += 1;
			}
		}
		return result;
	}

	// Driver code
	public static void main(String[] args)
	{
		int[] arr = { 0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1 };
		int N = arr.length;
		System.out.print(maxWater(arr, N));
	}
}

// This code is contributed by rutvik_56.

*/

/*
Quick sort impilimentation using java
public static void swap(int arr[],int start,int end){
int temp=arr[start];
arr[start]=arr[end];
 arr[end]=temp;
}

public static int partition(int arr[],int start,int end){
 int pivot=arr[end-1];
 int i=start-1;
 for(int j=start;j<=end-1;j++){
if(arr[j]<=pivot){
  i++;
  swap(arr,i,j);

 }
}
swap(arr,i+1,end);
return (i+1);
}
public static void quickSort(int[] arr,int start,int end){
  if(start<end){
    int pivot=partition(arr,start,end);
    quickSort(arr,start,pivot-1);
    quickSort(arr,pivot+1,end);
  }
}
*/
