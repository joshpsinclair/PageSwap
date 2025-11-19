import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { IndexDbUserRepository } from './IndexDbUserRepository';
import { StaticAssetImageRepository } from './StaticAssetImageRepository';
import type { IUserRepository, IImageRepository } from './types';
import type { IUser } from '../types/IUser';

interface RepositoryContextValue {
  userRepository: IUserRepository;
  imageRepository: IImageRepository;
}

interface DevUtilities {
  clearUsers: () => Promise<void>;
  seedUsers: (users: IUser[]) => Promise<void>;
}

const RepositoryContext = createContext<RepositoryContextValue | null>(null);
const DevUtilitiesContext = createContext<DevUtilities | null>(null);

interface RepositoryProviderProps {
  children: ReactNode;
}

export function RepositoryProvider({ children }: RepositoryProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [userRepository] = useState(() => new IndexDbUserRepository());
  const [imageRepository] = useState(() => new StaticAssetImageRepository());

  useEffect(() => {
    const initialize = async () => {
      try {
        await userRepository.initialize();
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize repositories:', error);
      }
    };

    initialize();
  }, [userRepository]);

  const devUtilities: DevUtilities = {
    clearUsers: async () => {
      await userRepository.clear();
    },
    seedUsers: async (users: IUser[]) => {
      await userRepository.seed(users);
    },
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <RepositoryContext.Provider value={{ userRepository, imageRepository }}>
      <DevUtilitiesContext.Provider value={devUtilities}>{children}</DevUtilitiesContext.Provider>
    </RepositoryContext.Provider>
  );
}

export function useUserRepository(): IUserRepository {
  const context = useContext(RepositoryContext);
  if (!context) {
    throw new Error('useUserRepository must be used within a RepositoryProvider');
  }
  return context.userRepository;
}

export function useImageRepository(): IImageRepository {
  const context = useContext(RepositoryContext);
  if (!context) {
    throw new Error('useImageRepository must be used within a RepositoryProvider');
  }
  return context.imageRepository;
}

export function useDevUtilities(): DevUtilities {
  const context = useContext(DevUtilitiesContext);
  if (!context) {
    throw new Error('useDevUtilities must be used within a RepositoryProvider');
  }
  return context;
}
