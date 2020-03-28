#include<bits/stdc++.h>
using namespace std;

int main()
{
	int t;
	cin>>t;

	while(t--)
	{
		
		int n;
		cin>>n;
		int arr[n];
		int sum=0;
		for(int i=0;i<n;i++)
			cin>>arr[i];
		int c=arr[0];
		for(int i=0;i<n;i++)
		{
			if(arr[i]<c)
			{
				sum++;
				
			}
			else if(arr[i]>c)
				c=arr[i];
		}

		cout<<sum<<endl;
	}
}