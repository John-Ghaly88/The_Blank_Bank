import apiService from "../services/apiService";
import { useQuery, useQueryClient, useMutation } from "react-query";

export default function useFetchUser(userId) {
  return useQuery(["userData", userId], () =>
    apiService.get(`user/${userId}`).then(({ data }) => data)
  );
}

export default function useMutateLoginUser() {
  return useMutation(
    (user) => {
      const data = new FormData();
      data.append("email", user.email);
      data.append("password", user.password);
      return apiService.post(`user/login`, data);
    },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        // Store Token in local storage
      },
      onError: (e) => console.log(e.message),
    }
  );
}


export default function useMutateRegisterUser() {
  return useMutation(
    (user) => {
      const data = new FormData();
      data.append("email", user.email);
      data.append("password", user.password);
      return apiService.post(`user/register`, data);
    },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        // Redirect to login page
      },
      onError: (e) => console.log(e.message),
    }
  );
}

export default function useMutateUpdateUser(userId) {
  const queryClint = useQueryClient();
  return useMutation(
    (user) => {
      const data = new FormData();
      data.append("email", user.email);
      data.append("password", user.password);
      return apiService.post(`user/${userId}`, data);
    },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        return queryClint.setQueryData(
          ["userData", userId],
          (data) => {
            return [
              {
                email: responseData.data.body.email,
                password: responseData.data.body.password,
              },
              ...data,
            ];
          }
        );
      },
      onError: (e) => console.log(e.message),
    }
  );
}
