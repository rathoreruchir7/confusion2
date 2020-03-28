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
		for(int i=0;i<n;i++)
			cin>>arr[i];
		int sum=0;
		while(arr[0]>=1 && arr[2]>=2)
		{
			sum+=3;
			arr[0]--;
			arr[2]=arr[2]-2;
		}

		while((arr[1]>=2 && arr[2]>=1))
		{
			sum+=3;
			arr[1]=arr[1]-2;
			arr[2]--;
		}
		cout<<sum<<endl;
	}
}