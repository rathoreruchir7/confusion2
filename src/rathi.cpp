
#include <bits/stdc++.h> 
using namespace std; 

int gcdNum(int a, int b)
{
	if(a==0)
		return b;
	else if(b==0)
		return a;

	else if(a==b)
		return a;

	if(a>b)
		return gcdNum(a-b,b);
	else
		return gcdNum(a,b-a);
}

int lcmNum(int a, int b) 
{ 
	return (a*b)/gcdNum(a, b); 
} 
 



int main() 
{ 
	
	int t;
	cin>>t;

	while(t--)
	{
		int n;
		cin>>n;

		int arr[n];
		for(int i=0;i<n;i++)
			cin>>arr[i];
		cout<<arr[0]<<" ";

		for(int i=0;i<n-1;i++)
		{
			cout<<lcmNum(arr[i],arr[i+1])<<" ";
		}
		cout<<arr[n-1];
		cout<<endl;
	}
} 
